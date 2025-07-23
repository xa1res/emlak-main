import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { datas } from '../../../../public/assets/datas/generic-datas/data';
import { Footer } from '../footer/footer';

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
  imports: [CommonModule, MatIconModule, Footer, RouterModule],
  templateUrl: './ilan-listesi.html',
  styleUrls: ['./ilan-listesi.css']
})
export class IlanListesi implements OnInit {
  properties: Property[] = [];
  ilanDurumu: string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ilanDurumu = params.get('durum');
      this.properties = [];
      datas.forEach(danisman => {
        danisman.properties.forEach(property => {
          if (this.ilanDurumu === 'satilik' && property.durum === 'Satılık') {
            this.properties.push(property);
          } else if (this.ilanDurumu === 'kiralik' && property.durum === 'Kiralık') {
            this.properties.push(property);
          }
        });
      });
    });
  }
}