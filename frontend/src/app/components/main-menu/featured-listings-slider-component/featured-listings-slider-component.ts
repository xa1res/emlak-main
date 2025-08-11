import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { datas } from '../../../../../public/assets/datas/generic-datas/data';

interface Property {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  location: string;
  emlakci: string;
  durum: string;
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
  ) {
    this.oneCikanlar = [
      ...datas[0].properties.slice(0, 8),
      ...datas[1].properties.slice(0, 8)
    ];
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.startTimer();
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
    if (this.oneCikanlar.length === 0) {
      return [];
    }
    for (let i = 0; i < numToShow; i++) {
      ilanlar.push(this.oneCikanlar[(this.aktifIndex + i) % this.oneCikanlar.length]);
    }
    return ilanlar;
  }

  ileri() {
    if (this.animating) return;
    this.animating = true;

    const numToSlide = this.isMobile ? 1 : 1;
    this.aktifIndex = (this.aktifIndex + numToSlide) % this.oneCikanlar.length;

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

    const numToSlide = this.isMobile ? 1 : 1;
    this.aktifIndex = (this.aktifIndex - numToSlide + this.oneCikanlar.length) % this.oneCikanlar.length;

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