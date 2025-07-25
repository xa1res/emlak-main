import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { datas } from '../../../../public/assets/datas/generic-datas/data';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, MatIconModule, Footer, RouterModule, FormsModule],
  templateUrl: './ilan-listesi.html',
  styleUrls: ['./ilan-listesi.css']
})
export class IlanListesi implements OnInit {
  allProperties: Property[] = [];
  properties: Property[] = [];
  ilanDurumu: string | null = '';

  selectedDurumFilter: string = 'all';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minM2: number | null = null;
  maxM2: number | null = null;
  selectedOdaSayisi: string = 'Tümü';
  searchText: string = '';

  durumFilterOptions: string[] = ['Tümü', 'Satılık', 'Kiralık'];
  odaSayisiOptions: string[] = ['Tümü', 'Stüdyo', '1+0', '1+1', '2+1', '3+1', '3+2', '4+1', '4+2', '5+1', '5+2', '6+1', '6+2 ve üzeri'];


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    datas.forEach(danisman => {
      danisman.properties.forEach(property => {
        this.allProperties.push(property);
      });
    });

    this.route.paramMap.subscribe(params => {
      this.ilanDurumu = params.get('durum');
      if (this.ilanDurumu === 'satilik') {
        this.selectedDurumFilter = 'satilik';
      } else if (this.ilanDurumu === 'kiralik') {
        this.selectedDurumFilter = 'kiralik';
      } else {
        this.selectedDurumFilter = 'all';
      }
      this.applyCurrentFilters();
    });
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

    this.properties = filtered;
  }

  filterProperties(): void {
    this.applyCurrentFilters();
  }

  clearFilters(): void {
    this.selectedDurumFilter = 'all';
    this.minPrice = null;
    this.maxPrice = null;
    this.minM2 = null;
    this.maxM2 = null;
    this.selectedOdaSayisi = 'Tümü';
    this.searchText = '';
    this.applyCurrentFilters();
  }
}