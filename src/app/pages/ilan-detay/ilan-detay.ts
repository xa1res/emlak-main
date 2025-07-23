import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Footer } from '../footer/footer'; 
import { datas } from '../../../../public/assets/datas/generic-datas/data';
// Gerekli importları ekliyoruz
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Ilan interface'ine haritaUrl özelliğini ekliyoruz
interface Ilan {
  id: string;
  imageURL: string;
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
    NgFor,
    Footer 
  ],
  templateUrl: './ilan-detay.html',
  styleUrl: './ilan-detay.css'
})
export class IlanDetayComponent implements OnInit {
  ilan: Ilan | undefined;
  danisman: Danisman | undefined;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

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

  get aciklamaSatirlari(): string[] {
    return this.ilan?.aciklama
      ? this.ilan.aciklama.split('\n').filter((line: string) => line.trim())
      : [];
  }
  
  public getGuvenliUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}