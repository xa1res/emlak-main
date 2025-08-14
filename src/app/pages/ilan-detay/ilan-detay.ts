// src/app/pages/ilan-detay/ilan-detay.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import { Footer } from '../footer/footer';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  styleUrls: ['./ilan-detay.css'] // ✅ 'styleUrl' değil, 'styleUrls'
})
export class IlanDetayComponent implements OnInit {
  ilan: Ilan | undefined;
  danisman: Danisman | undefined;
  loading = true;
  error: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  private unwrap<T>(res: any): T {
    // dizi ise direkt, değilse {data}/{Data} içinden al
    return (Array.isArray(res) ? res : (res?.data ?? res?.Data ?? res)) as T;
  }

  private getIlan$(id: string) {
    // NOT: environment.apiUrl = '/api' → ekstra '/api' ekleme
    return this.http
      .get<any>(`${environment.apiUrl}/Ilanlar/${encodeURIComponent(id)}`)
      .pipe(map(res => this.unwrap<Ilan>(res)));
  }

  private getDanismanlar$() {
    // Önce /Danismanlar dene; 404 olursa /Danisman'a düş
    return this.http.get<any>(`${environment.apiUrl}/Danismanlar`).pipe(
      map(res => this.unwrap<Danisman[]>(res)),
      catchError(() =>
        this.http
          .get<any>(`${environment.apiUrl}/Danisman`)
          .pipe(map(res => this.unwrap<Danisman[]>(res)), catchError(() => of([] as Danisman[])))
      )
    );
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // SSR'de veri çekmeyi atla (mevcut yapını bozmayalım)
      return;
    }

    this.route.paramMap.subscribe(params => {
      const ilanId = params.get('id');
      if (!ilanId) {
        this.error = 'İlan ID bulunamadı';
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = null;

      forkJoin({
        ilan: this.getIlan$(ilanId).pipe(
          catchError((e: HttpErrorResponse) => {
            this.error = `İlan yüklenirken hata: ${e.status} ${e.statusText}`;
            return of(null);
          })
        ),
        danismanlar: this.getDanismanlar$(),
      }).subscribe(({ ilan, danismanlar }) => {
        if (ilan) {
          // harita linki alan adını eşitle
          if (!ilan.haritaUrl && ilan.konumLinki) ilan.haritaUrl = ilan.konumLinki;
          if (ilan.imageCount == null) ilan.imageCount = 0;

          this.ilan = ilan;
          this.danisman = (danismanlar || []).find(d => d.isim === ilan.emlakci);
        } else if (!this.error) {
          this.error = 'İlan bulunamadı';
        }
        this.loading = false;
      });
    });
  }
}
