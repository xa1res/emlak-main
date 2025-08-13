// src/app/pages/ilan-listesi/ilan-listesi.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    HttpClientModule
  ],
  templateUrl: './ilan-listesi.html',
  styleUrls: ['./ilan-listesi.css']
})
export class IlanListesi implements OnInit {
  allProperties: Property[] = [];
  properties: Property[] = [];
  ilanDurumu: string | null = '';
  loading: boolean = true;

  selectedDurumFilter: string = 'all';
  searchText: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minM2: number | null = null;
  maxM2: number | null = null;
  selectedOdaSayisi: string = 'Tümü';
  selectedSortOption: string = 'default';

  durumFilterOptions: string[] = ['Tümü', 'Satılık', 'Kiralık'];
  odaSayisiOptions: string[] = ['Tümü', 'Stüdyo', '1+0', '1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1', '5+2', '6+1', '6+2 ve üzeri'];
  sortOptions: { value: string, label: string }[] = [
    { value: 'default', label: 'Sıralama Seçin' },
    { value: 'priceAsc', label: 'Fiyata Göre Artan' },
    { value: 'priceDesc', label: 'Fiyata Göre Azalan' },
    { value: 'm2Asc', label: 'M²\'ye Göre Artan' },
    { value: 'm2Desc', label: 'M²\'ye Göre Azalan' },
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ilanDurumu = params.get('durum');
      if (this.ilanDurumu === 'satilik') {
        this.selectedDurumFilter = 'satilik';
      } else if (this.ilanDurumu === 'kiralik') {
        this.selectedDurumFilter = 'kiralik';
      } else {
        this.selectedDurumFilter = 'all';
      }
      this.fetchProperties();
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const searchParam = queryParams.get('search');
      if (searchParam) {
        this.searchText = searchParam;
      } else {
        this.searchText = '';
      }
      this.applyCurrentFilters();
    });
  }

  fetchProperties(): void {
    this.loading = true;
    this.http.get<Property[]>(`${environment.apiUrl}/ilanlar`).subscribe(properties => {
      this.allProperties = properties;
      this.loading = false;
      this.applyCurrentFilters();
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
      filtered = filtered.filter(property => property.durum.toLowerCase() === this.selectedDurumFilter);
    }

    if (this.minPrice !== null) {
      filtered = filtered.filter(property => property.price >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(property => property.price <= this.maxPrice!);
    }

    if (this.minM2 !== null) {
      filtered = filtered.filter(property => property.m2 >= this.minM2!);
    }
    if (this.maxM2 !== null) {
      filtered = filtered.filter(property => property.m2 <= this.maxM2!);
    }

    if (this.selectedOdaSayisi !== 'Tümü') {
      filtered = filtered.filter(property => property.odaSayisi === this.selectedOdaSayisi);
    }

    if (this.searchText.trim() !== '') {
      const lowerCaseSearchText = this.searchText.trim().toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(lowerCaseSearchText) ||
        property.location.toLowerCase().includes(lowerCaseSearchText)
      );
    }

    switch (this.selectedSortOption) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'm2Asc':
        filtered.sort((a, b) => a.m2 - b.m2);
        break;
      case 'm2Desc':
        filtered.sort((a, b) => b.m2 - a.m2);
        break;
    }

    this.properties = filtered;
  }
}