import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import { Footer } from '../footer/footer';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, catchError, of } from 'rxjs';
import { datas } from '../../../../public/assets/datas/generic-datas/data';

import { IlanImageGalleryComponent } from '../../components/ilan-detay/ilan-image-gallery-component/ilan-image-gallery-component';
import { IlanOzelliklerComponent } from '../../components/ilan-detay/ilan-ozellikler-component/ilan-ozellikler-component';
import { IlanDanismanBilgisiComponent } from '../../components/ilan-detay/ilan-danisman-bilgisi-component/ilan-danisman-bilgisi-component';
import { IlanKonumHaritaComponent } from '../../components/main-menu/ilan-konum-harita-component/ilan-konum-harita-component';

// Local data'dan gelen interface'i kullan
interface LocalProperty {
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
  ilanTarihi: string;
  emlakTipi: string;
  binaYasi: number | null;
  bulunduguKat: string | null;
  katSayisi: number | null;
  isitma: string | null;
  banyoSayisi: string | null;
  mutfakTipi: string | null;
  balkon: string | null;
  asansor: string | null;
  otopark: string | null;
  esyali: string | null;
  kullanimDurumu: string | null;
  siteIcerisinde: string | null;
  krediyeUygun: string | null;
  tapuDurumu: string | null;
  kimden: string | null;
  takas: string | null;
  haritaUrl: string | null;
  imageCount: number;
}

interface LocalDanisman {
  foto: string;
  url: string;
  isim: string;
  hakkimda: string;
  telefon: string;
  mail: string;
  instagram: string;
  whatsapp: string;
  endeksa: string;
  properties: LocalProperty[];
}

// Component'te kullanılacak interface
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
      console.log('İlan ID:', ilanId);
      
      if (ilanId) {
        this.loading = true;
        this.error = null;
        
        // Önce local data'dan ilanı bulmaya çalış
        const allProperties: LocalProperty[] = (datas as LocalDanisman[]).flatMap(danisman => danisman.properties);
        const localIlan = allProperties.find(p => p.id === ilanId);
        
        if (localIlan) {
          console.log('Local data\'dan bulunan ilan:', localIlan);
          // Local property'yi Ilan interface'ine dönüştür
          this.ilan = {
            id: localIlan.id,
            imageCount: localIlan.imageCount,
            title: localIlan.title,
            price: localIlan.price,
            location: localIlan.location,
            emlakci: localIlan.emlakci,
            durum: localIlan.durum,
            konumLinki: localIlan.konumLinki,
            aciklama: localIlan.aciklama,
            m2: localIlan.m2,
            odaSayisi: localIlan.odaSayisi,
            ilanTarihi: localIlan.ilanTarihi,
            emlakTipi: localIlan.emlakTipi,
            binaYasi: localIlan.binaYasi,
            bulunduguKat: localIlan.bulunduguKat,
            katSayisi: localIlan.katSayisi,
            isitma: localIlan.isitma,
            banyoSayisi: localIlan.banyoSayisi,
            mutfakTipi: localIlan.mutfakTipi,
            balkon: localIlan.balkon,
            asansor: localIlan.asansor,
            otopark: localIlan.otopark,
            esyali: localIlan.esyali,
            kullanimDurumu: localIlan.kullanimDurumu,
            siteIcerisinde: localIlan.siteIcerisinde,
            krediyeUygun: localIlan.krediyeUygun,
            tapuDurumu: localIlan.tapuDurumu || '',
            kimden: localIlan.kimden || '',
            takas: localIlan.takas,
            haritaUrl: localIlan.haritaUrl || ''
          };
          
          const localDanisman = (datas as LocalDanisman[]).find(d => d.isim === localIlan.emlakci);
          if (localDanisman) {
            this.danisman = {
              foto: localDanisman.foto,
              url: localDanisman.url,
              isim: localDanisman.isim,
              hakkimda: localDanisman.hakkimda,
              telefon: localDanisman.telefon,
              mail: localDanisman.mail,
              instagram: localDanisman.instagram,
              whatsapp: localDanisman.whatsapp,
              endeksa: localDanisman.endeksa,
              properties: []
            };
          }
          
          this.loading = false;
        } else {
          console.log('Local data\'da ilan bulunamadı, backend\'den aranıyor...');
          
          // Local data'da bulunamazsa backend'den dene
          forkJoin({
            ilan: this.http.get<Ilan>(`http://localhost:3000/api/ilanlar/${ilanId}`).pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('İlan API hatası:', error);
                this.error = `İlan yüklenirken hata oluştu: ${error.status} ${error.statusText}`;
                return of(null);
              })
            ),
            danismanlar: this.http.get<Danisman[]>(`http://localhost:3000/api/danismanlar`).pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('Danışman API hatası:', error);
                return of([]);
              })
            )
          }).subscribe(({ ilan, danismanlar }) => {
            console.log('API yanıtı - İlan:', ilan);
            console.log('API yanıtı - Danışmanlar:', danismanlar);
            
            if (ilan) {
              this.ilan = ilan;
              this.danisman = danismanlar.find(d => d.isim === ilan.emlakci);
              console.log('Bulunan danışman:', this.danisman);
            } else {
              this.error = 'İlan bulunamadı';
            }
            
            this.loading = false;
          });
        }
      } else {
        this.error = 'İlan ID bulunamadı';
        this.loading = false;
      }
    });
  }
}