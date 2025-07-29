import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common'; 
import { Footer } from '../footer/footer';
import { datas } from '../../../../public/assets/datas/generic-datas/data';

import { IlanImageGalleryComponent } from '../../components/ilan-detay/ilan-image-gallery-component/ilan-image-gallery-component';
import { IlanOzelliklerComponent } from '../../components/ilan-detay/ilan-ozellikler-component/ilan-ozellikler-component';
import { IlanDanismanBilgisiComponent } from '../../components/ilan-detay/ilan-danisman-bilgisi-component/ilan-danisman-bilgisi-component';
import { IlanKonumHaritaComponent } from '../../components/main-menu/ilan-konum-harita-component/ilan-konum-harita-component';


interface Ilan {
  id: string;
  imageCount: number;
  title: string;
  price: number;
  location: string;
  emlakci: string;
  durum: string;
  konumLinki?: string;
  aciklama?: string;
  m2: number;
  odaSayisi: string | null;
  ilanTarihi?: string;
  emlakTipi?: string;
  binaYasi?: number | null;
  bulunduguKat?: string | null;
  katSayisi?: number | null;
  isitma?: string | null;
  banyoSayisi?: string | null;
  mutfakTipi?: string | null;
  balkon?: string | null;
  asansor?: string | null;
  otopark?: string | null;
  esyali: string | null;
  kullanimDurumu: string | null;
  siteIcerisinde: string | null;
  krediyeUygun?: string | null;
  tapuDurumu?: string;
  kimden?: string;
  takas?: string | null;
  haritaUrl?: string;
}

interface Danisman {
  foto: string;
  url: string;
  isim: string;
  hakkimda: string;
  telefon: string;
  mail: string;
  instagram?: string;
  whatsapp?: string;
  endeksa?: string;
  properties: Ilan[];
}

@Component({
  selector: 'app-ilan-detay',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    Footer,
    IlanImageGalleryComponent,
    IlanOzelliklerComponent,
    IlanDanismanBilgisiComponent,
    IlanKonumHaritaComponent
  ],
  templateUrl: './ilan-detay.html',
  styleUrl: './ilan-detay.css'
})
export class IlanDetayComponent implements OnInit {
  ilan: Ilan | undefined;
  danisman: Danisman | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const ilanId = params.get('id');
      if (ilanId) {
        for (const danismanData of datas) {
          const foundIlan = danismanData.properties.find((p: Ilan) => p.id === ilanId);
          if (foundIlan) {
            this.ilan = foundIlan as Ilan;
            this.danisman = danismanData as Danisman;
            break;
          }
        }
      }
    });
  }
}