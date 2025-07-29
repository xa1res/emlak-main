import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Footer } from '../footer/footer';
import { datas } from '../../../../public/assets/datas/generic-datas/data';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [Footer, DecimalPipe, CommonModule, RouterModule],
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.css']
})
export class MainMenu implements AfterViewInit, OnDestroy {
  public oneCikanlar: any[] = [];
  public aktifIndex: number = 0;
  public kaymaYonu: 'none' | 'left' | 'right' = 'none';
  public animating = false;
  private slideInterval: any;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {
    this.oneCikanlar = [
      ...datas[0].properties.slice(0, 8),
      ...datas[1].properties.slice(0, 8)
    ];
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
      console.log(1)
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.clearTimer();
    }
  }

  startTimer(): void {
    this.slideInterval = setInterval(() => {
      this.ileri();
      console.log(2)
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
    const ilanlar = [];
    for (let i = 0; i < 3; i++) {
      ilanlar.push(this.oneCikanlar[(this.aktifIndex + i) % this.oneCikanlar.length]);
    }
    return ilanlar;
  }

  ileri() {
    if (this.animating) return;
    this.animating = true;
    
    this.aktifIndex = (this.aktifIndex + 1) % this.oneCikanlar.length;
    
    this.kaymaYonu = 'left';

    console.log(this.aktifIndex,"sdasd")
    
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
    
    this.aktifIndex = (this.aktifIndex - 1 + this.oneCikanlar.length) % this.oneCikanlar.length;
    
    this.kaymaYonu = 'right';
    
    setTimeout(() => {
      this.kaymaYonu = 'none';
      this.animating = false;
    }, 300);

    if (isPlatformBrowser(this.platformId)) {
      this.resetTimer();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe(fragment => {
        if (fragment === 'danisman-blok') {
          setTimeout(() => {
            const el = document.getElementById('danisman-blok');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      });
    }
  }
}