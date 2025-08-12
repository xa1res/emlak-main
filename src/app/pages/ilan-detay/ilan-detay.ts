import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common'; 
import { Footer } from '../footer/footer';

import { IlanImageGalleryComponent } from '../../components/ilan-detay/ilan-image-gallery-component/ilan-image-gallery-component';
import { IlanOzelliklerComponent } from '../../components/ilan-detay/ilan-ozellikler-component/ilan-ozellikler-component';
import { IlanDanismanBilgisiComponent } from '../../components/ilan-detay/ilan-danisman-bilgisi-component/ilan-danisman-bilgisi-component';
import { IlanKonumHaritaComponent } from '../../components/main-menu/ilan-konum-harita-component/ilan-konum-harita-component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Types dosyasını bulamadığı için arayüzleri buraya taşıdık
interface Property {
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
  properties: Property[];
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
  ilan: Property | undefined;
  danisman: Danisman | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const ilanId = params.get('id');
      if (ilanId) {
        this.http.get<Property>(`${environment.backendUrl}/ilanlar/${ilanId}`).subscribe(
          (ilanData: Property) => {
            this.ilan = ilanData;
            if (this.ilan && this.ilan.emlakci) {
              const danismanUrl = this.ilan.emlakci.toLowerCase().replace(' ', '-');
              this.http.get<Danisman>(`${environment.backendUrl}/danismanlar/${danismanUrl}`).subscribe(
                (danismanData: Danisman) => {
                  this.danisman = danismanData;
                },
                error => {
                  console.error('Danışman bilgisi çekme hatası:', error);
                  this.danisman = undefined;
                }
              );
            }
          },
          error => {
            console.error('İlan çekme hatası:', error);
            this.ilan = undefined;
          }
        );
      }
    });
  }
}