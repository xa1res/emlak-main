import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { IlanListesiFilterBarComponent } from '../../components/ilan-listesi/ilan-listesi-filter-bar-component/ilan-listesi-filter-bar-component';
import { IlanListesiGridComponent } from '../../components/ilan-listesi/ilan-listesi-grid-component/ilan-listesi-grid-component';

interface Property {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  location: string;
  emlakci: string;
  durum: string;
  konumLinki: string;
  aciklama: string;
  m2: number;
  odaSayisi: string | null;
}

@Component({
  selector: 'app-ilan-listesi',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    Footer,
    RouterModule,
    FormsModule,
    IlanListesiFilterBarComponent,
    IlanListesiGridComponent,
    // Not: Root’ta provideHttpClient(withFetch()) kullandığın için
    // burada HttpClientModule import etmek zorunlu değil.
  ],
  templateUrl: './ilan-listesi.html',
  styleUrls: ['./ilan-listesi.css']
})
export class IlanListesi implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  allProperties: Property[] = [];
  properties: Property[] = [];
  ilanDurumu: string | null = '';
  loading = true;

  selectedDurumFilter: string = 'all';
  searchText: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minM2: number | null = null;
  maxM2: number | null = null;
  selectedOdaSayisi: string = 'Tümü';
  selectedSortOption: string = 'default';

  durumFilterOptions: string[] = ['Tümü', 'Satılık', 'Kiralık'];
  odaSayisiOptions: string[] = [
    'Tümü', 'Stüdyo', '1+0', '1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1', '5+2', '6+1', '6+2 ve üzeri'
  ];
  sortOptions: { value: string, label: string }[] = [
    { value: 'default', label: 'Sıralama Seçin' },
    { value: 'priceAsc', label: 'Fiyata Göre Artan' },
    { value: 'priceDesc', label: 'Fiyata Göre Azalan' },
    { value: 'm2Asc', label: 'M²\'ye Göre Artan' },
    { value: 'm2Desc', label: 'M²\'ye Göre Azalan' },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ilanDurumu = params.get('durum');
      this.selectedDurumFilter =
        this.ilanDurumu === 'satilik' ? 'satilik' :
        this.ilanDurumu === 'kiralik' ? 'kiralik' : 'all';

      this.fetchProperties();
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const searchParam = queryParams.get('search');
      this.searchText = searchParam ? searchParam : '';
      this.applyCurrentFilters();
    });
  }

  /** 🔧 DÜZELTİLDİ: /api/api/ilanlar yerine tek /api kullan */
  fetchProperties(): void {
    this.loading = true;

    this.http.get<any>(`${environment.apiUrl}/Ilanlar`).subscribe({
      next: (res) => {
        // Backend bazen { meta, data: [...] } döndürüyor → data’yı al
        const items = Array.isArray(res)
          ? res
          : (res?.data ?? res?.Data ?? res?.items ?? res?.Items ?? []);

        this.allProperties = (items ?? []) as Property[];
        this.loading = false;
        this.applyCurrentFilters();
      },
      error: (err) => {
        console.error('İlanlar yüklenemedi:', err);
        this.allProperties = [];
        this.loading = false;
        this.applyCurrentFilters();
      }
    });
  }

  onFiltersChanged(filters: any): void {
    this.selectedDurumFilter = filters.selectedDurumFilter;
    this.searchText = filters.searchText;
    this.minPrice = filters.minPrice;
    this.maxPrice = filters.maxPrice;
    this.minM2 = filters.minM2;
    this.maxM2 = filters.maxM2;
    this.selectedOdaSayisi = filters.selectedOdaSayisi;
    this.selectedSortOption = filters.selectedSortOption;
    this.applyCurrentFilters();
  }

  onFiltersCleared(): void {
    this.selectedDurumFilter = 'all';
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minM2 = null;
    this.maxM2 = null;
    this.selectedOdaSayisi = 'Tümü';
    this.selectedSortOption = 'default';
    this.router.navigate(['/ilan-listesi/all']);
    this.applyCurrentFilters();
  }

  applyCurrentFilters(): void {
    let filtered = [...this.allProperties];

    if (this.selectedDurumFilter !== 'all') {
      filtered = filtered.filter(p => (p.durum ?? '').toLowerCase() === this.selectedDurumFilter);
    }

    if (this.minPrice !== null) filtered = filtered.filter(p => p.price >= this.minPrice!);
    if (this.maxPrice !== null) filtered = filtered.filter(p => p.price <= this.maxPrice!);

    if (this.minM2 !== null) filtered = filtered.filter(p => p.m2 >= this.minM2!);
    if (this.maxM2 !== null) filtered = filtered.filter(p => p.m2 <= this.maxM2!);

    if (this.selectedOdaSayisi !== 'Tümü') {
      filtered = filtered.filter(p => p.odaSayisi === this.selectedOdaSayisi);
    }

    if (this.searchText.trim() !== '') {
      const q = this.searchText.trim().toLowerCase();
      filtered = filtered.filter(p =>
        (p.title ?? '').toLowerCase().includes(q) ||
        (p.location ?? '').toLowerCase().includes(q)
      );
    }

    switch (this.selectedSortOption) {
      case 'priceAsc': filtered.sort((a, b) => a.price - b.price); break;
      case 'priceDesc': filtered.sort((a, b) => b.price - a.price); break;
      case 'm2Asc': filtered.sort((a, b) => a.m2 - b.m2); break;
      case 'm2Desc': filtered.sort((a, b) => b.m2 - a.m2); break;
    }

    this.properties = filtered;
  }
}
