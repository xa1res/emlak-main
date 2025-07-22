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
  odaSayisi: string;
}

interface Bilgi {
  foto: string;
  isim: string;
  hakkimda: string;
  telefon: string;
  mail: string;
  instagram: string;
  whatsapp: string;
  endeksa: string;
  properties: Property[];
}

@Component({
  selector: 'app-danisman',
  standalone: true,
  imports: [CommonModule, MatIconModule, Footer, RouterModule],
  templateUrl: './danisman.html',
  styleUrls: ['./danisman.css']
})
export class Danisman implements OnInit {
  consultantData: Bilgi[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const consultantUrl = params.get('url');
      if (consultantUrl) {
        this.consultantData = datas.filter(data => 
          data.url.toString() === consultantUrl
        );
      }
    });
  }

  // Helper function to convert names to a URL-friendly slug (lowercase, replace spaces with hyphens)
  // Türkçe karakterleri de işleyecek şekilde güncellendi
  // convertToSlug(text: string): string {
  //   text = text.toLowerCase();
  //   text = text.replace(/ş/g, 's');
  //   text = text.replace(/ç/g, 'c');
  //   text = text.replace(/ğ/g, 'g');
  //   text = text.replace(/ı/g, 'i');
  //   text = text.replace(/ö/g, 'o');
  //   text = text.replace(/ü/g, 'u');
  //   text = text.replace(/[^a-z0-9\s-]/g, ''); // Harf, rakam, boşluk ve tire dışındaki karakterleri kaldır
  //   text = text.replace(/\s+/g, '-'); // Birden fazla boşluğu tek tireye dönüştür
  //   text = text.replace(/^-+|-+$/g, ''); // Başındaki ve sonundaki tireleri kaldır
  //   return text;
  // }
}