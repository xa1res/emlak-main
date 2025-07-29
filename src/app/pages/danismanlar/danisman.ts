import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { datas } from '../../../../public/assets/datas/generic-datas/data';
import { Footer } from '../footer/footer';

import { ConsultantOverviewComponent } from '../../components/danismanlar/danisman-genel/danisman-genel';
import { ConsultantPropertiesGridComponent } from '../../components/danismanlar/danisman-ilan/danisman-ilan';

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
  url: string;
}

@Component({
  selector: 'app-danisman',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    Footer,
    RouterModule,
    ConsultantOverviewComponent,
    ConsultantPropertiesGridComponent
  ],
  templateUrl: './danisman.html',
  styleUrls: ['./danisman.css']
})
export class Danisman implements OnInit {
  consultantData: Bilgi | undefined; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const consultantUrl = params.get('url');
      if (consultantUrl) {
        // datas'ı Bilgi[] olarak varsayarak, doğrudan find kullanıyoruz
        this.consultantData = datas.find((data: Bilgi) => data.url.toString() === consultantUrl);
      }
    });
  }
}
