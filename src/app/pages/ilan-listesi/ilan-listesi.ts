import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IlanListesiFilterBarComponent } from '../../components/ilan-listesi/ilan-listesi-filter-bar-component/ilan-listesi-filter-bar-component';
import { IlanListesiGridComponent } from '../../components/ilan-listesi/ilan-listesi-grid-component/ilan-listesi-grid-component';

// Types dosyasını bulamadığı için arayüzü buraya taşıdık
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
  ilanTarihi: string;
  emlakTipi: string;
  binaYasi: number | null;
  bulunduguKat: string | null;
  katSayisi: number | null;
  isitma: string | null;
  banyoSayisi: string | null;
  mutfakTipi: string | null;
  balkon: string | null;
  asansor: string | null;
  otopark: string | null;
  esyali: string | null;
  kullanimDurumu: string | null;
  siteIcerisinde: string | null;
  krediyeUygun: string | null;
  tapuDurumu: string | null;
  kimden: string | null;
  takas: string | null;
  haritaUrl: string | null;
  imageCount: number;
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
    IlanListesiGridComponent
  ],
  templateUrl: './ilan-listesi.html',
  styleUrls: ['./ilan-listesi.css']
})
export class IlanListesi implements OnInit {
  allProperties: Property[] = [];
  properties: Property[] = [];
  ilanDurumu: string | null = '';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

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
    this.applyCurrentFilters();
  }

  applyCurrentFilters(): void {
    const params: any = {
      q: this.searchText,
      durum: this.selectedDurumFilter,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minM2: this.minM2,
      maxM2: this.maxM2,
      odaSayisi: this.selectedOdaSayisi === 'Tümü' ? undefined : this.selectedOdaSayisi,
      sortBy: this.selectedSortOption === 'default' ? undefined : this.selectedSortOption,
    };

    this.http.get<any>(`${environment.backendUrl}/ilanlar/search`, { params })
      .subscribe(response => {
        this.properties = response.data;
      });
  }
}