// src/app/pages/danismanlar/danisman.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { ConsultantOverviewComponent } from '../../components/danismanlar/danisman-genel-component/danisman-genel-component';
import { ConsultantPropertiesGridComponent } from '../../components/danismanlar/danisman-ilan-component/danisman-ilan-component';

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
    NgIf,
    MatIconModule,
    Footer,
    RouterModule,
    ConsultantOverviewComponent,
    ConsultantPropertiesGridComponent,
    HttpClientModule
  ],
  templateUrl: './danisman.html',
  styleUrls: ['./danisman.css']
})
export class Danisman implements OnInit {
  consultantData: Bilgi | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.route.paramMap.pipe(
      map(params => params.get('url')),
      switchMap(consultantUrl => {
        if (!consultantUrl) return of(undefined);

        // ✅ API: tek /api kullan, endpoint: /Danismanlar
        return this.http.get<any>(`${environment.apiUrl}/Danismanlar`).pipe(
          // {data:[...]} / {Data:[...]} / doğrudan dizi — hepsini destekle
          map(res => {
            const list: Bilgi[] = Array.isArray(res)
              ? res
              : (res?.data ?? res?.Data ?? []);
            // url eşleşmesi (küçük/büyük harf duyarsız)
            const target = consultantUrl.toLowerCase();
            return list.find(d => (d.url ?? '').toLowerCase() === target);
          }),
          // Eski/alternatif endpoint’e düş (opsiyonel)
          catchError(() =>
            this.http.get<any>(`${environment.apiUrl}/Danisman`).pipe(
              map(res => {
                const list: Bilgi[] = Array.isArray(res)
                  ? res
                  : (res?.data ?? res?.Data ?? []);
                const target = consultantUrl.toLowerCase();
                return list.find(d => (d.url ?? '').toLowerCase() === target);
              }),
              catchError(() => of(undefined))
            )
          )
        );
      })
    ).subscribe(danisman => {
      this.consultantData = danisman;
    });
  }
}
