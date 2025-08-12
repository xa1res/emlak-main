import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common'; // NgIf kaldırıldı
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ilan-listesi-filter-bar',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule], // NgIf kaldırıldı
  templateUrl: './ilan-listesi-filter-bar-component.html',
  styleUrls: ['./ilan-listesi-filter-bar-component.css']
})
export class IlanListesiFilterBarComponent implements OnInit {
  @Input() selectedDurumFilter: string = 'all';
  @Input() searchText: string = '';
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;
  @Input() minM2: number | null = null;
  @Input() maxM2: number | null = null;
  @Input() selectedOdaSayisi: string = 'Tümü';
  @Input() selectedSortOption: string = 'default';

  @Input() durumFilterOptions: string[] = ['Tümü', 'Satılık', 'Kiralık'];
  @Input() odaSayisiOptions: string[] = ['Tümü', 'Stüdyo', '1+0', '1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1', '5+2', '6+1', '6+2 ve üzeri'];
  @Input() sortOptions: { value: string, label: string }[] = [
    { value: 'default', label: 'Sıralama Seçin' },
    { value: 'priceAsc', label: 'Fiyata Göre Artan' },
    { value: 'priceDesc', label: 'Fiyata Göre Azalan' },
    { value: 'm2Asc', label: 'M²\'ye Göre Artan' },
    { value: 'm2Desc', label: 'M²\'ye Göre Azalan' },
  ];

  @Output() filtersChanged = new EventEmitter<any>();
  @Output() filtersCleared = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onFilterChange(): void {
    this.emitFilters();
  }

  onClearFilters(): void {
    this.selectedDurumFilter = 'all';
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minM2 = null;
    this.maxM2 = null;
    this.selectedOdaSayisi = 'Tümü';
    this.selectedSortOption = 'default';
    this.filtersCleared.emit();
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({
      selectedDurumFilter: this.selectedDurumFilter,
      searchText: this.searchText,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minM2: this.minM2,
      maxM2: this.maxM2,
      selectedOdaSayisi: this.selectedOdaSayisi,
      selectedSortOption: this.selectedSortOption
    });
  }
}