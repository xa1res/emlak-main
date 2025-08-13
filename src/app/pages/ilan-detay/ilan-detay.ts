// src/app/pages/ilan-detay/ilan-detay.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import { Footer } from '../footer/footer';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

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
    IlanKonumHaritaComponent,
    HttpClientModule
  ],
  templateUrl: './ilan-detay.html',
  styleUrl: './ilan-detay.css'
})
export class IlanDetayComponent implements OnInit {
  ilan: Ilan | undefined;
  danisman: Danisman | undefined;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.route.paramMap.subscribe(params => {
      const ilanId = params.get('id');
      if (ilanId) {
        this.loading = true;
        this.error = null;
        
        forkJoin({
          ilan: this.http.get<Ilan>(`${environment.apiUrl}/ilanlar/${ilanId}`).pipe(
            catchError((error: HttpErrorResponse) => {
              this.error = `İlan yüklenirken hata oluştu: ${error.status} ${error.statusText}`;
              return of(null);
            })
          ),
          danismanlar: this.http.get<Danisman[]>(`${environment.apiUrl}/danismanlar`).pipe(
            catchError((error: HttpErrorResponse) => {
              return of([]);
            })
          )
        }).subscribe(({ ilan, danismanlar }) => {
          if (ilan) {
            this.ilan = ilan;
            this.danisman = danismanlar.find(d => d.isim === ilan.emlakci);
          } else {
            this.error = 'İlan bulunamadı';
          }
          this.loading = false;
        });
      } else {
        this.error = 'İlan ID bulunamadı';
        this.loading = false;
      }
    });
  }
}