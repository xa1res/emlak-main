import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { map, switchMap } from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('url')),
      switchMap(consultantUrl =>
        this.http.get<Bilgi[]>(`http://localhost:3000/api/danismanlar`).pipe(
          map(danismanlar => danismanlar.find(d => d.url === consultantUrl))
        )
      )
    ).subscribe(danisman => {
      this.consultantData = danisman;
    });
  }
}