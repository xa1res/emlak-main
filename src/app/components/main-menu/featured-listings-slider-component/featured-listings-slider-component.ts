import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Types dosyasını bulamadığı için arayüzü buraya taşıdık
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


@Component({
  selector: 'app-main-menu-featured-listings-slider',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterModule],
  templateUrl: './featured-listings-slider-component.html',
  styleUrls: ['./featured-listings-slider-component.css']
})
export class FeaturedListingsSliderComponent implements OnInit, OnDestroy {
  public oneCikanlar: Property[] = [];
  public aktifIndex: number = 0;
  public kaymaYonu: 'none' | 'left' | 'right' = 'none';
  public animating = false;
  private slideInterval: any;
  public isMobile: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.startTimer();
      this.http.get<Property[]>(`${environment.backendUrl}/ilanlar`).subscribe(response => {
        this.oneCikanlar = response.sort(() => 0.5 - Math.random()).slice(0, 8);
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.clearTimer();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = isPlatformBrowser(this.platformId) && window.innerWidth <= 1200;
  }

  startTimer(): void {
    this.slideInterval = setInterval(() => {
      this.ileri();
    }, 4000);
  }

  clearTimer(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  resetTimer(): void {
    this.clearTimer();
    this.startTimer();
  }

  get aktifIlanlar() {
    const numToShow = this.isMobile ? 1 : 3;
    const ilanlar = [];
    for (let i = 0; i < numToShow; i++) {
      ilanlar.push(this.oneCikanlar[(this.aktifIndex + i) % this.oneCikanlar.length]);
    }
    return ilanlar;
  }

  ileri() {
    if (this.animating) return;
    this.animating = true;

    this.aktifIndex = (this.aktifIndex + (this.isMobile ? 1 : 1)) % this.oneCikanlar.length;
    
    this.kaymaYonu = 'left';

    setTimeout(() => {
      this.kaymaYonu = 'none';
      this.animating = false;
    }, 300);

    if (isPlatformBrowser(this.platformId)) {
      this.resetTimer();
    }
  }

  geri() {
    if (this.animating) return;
    this.animating = true;

    this.aktifIndex = (this.aktifIndex - (this.isMobile ? 1 : 1) + this.oneCikanlar.length) % this.oneCikanlar.length;
    
    this.kaymaYonu = 'right';

    setTimeout(() => {
      this.kaymaYonu = 'none';
      this.animating = false;
    }, 300);

    if (isPlatformBrowser(this.platformId)) {
      this.resetTimer();
    }
  }
}