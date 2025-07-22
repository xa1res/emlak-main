import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
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
export class MainMenu implements AfterViewInit {
  public oneCikanlar: any[] = [];
  public aktifIndex: number = 0;
  public kaymaYonu: 'none' | 'left' | 'right' = 'none';
  public animating = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {
    // Öne çıkanlar için ilk 4 ilanı alalım (örnek)
    this.oneCikanlar = [
      ...datas[0].properties.slice(0, 2), // Hasan Dugan'dan 2 ilan
      ...datas[1].properties.slice(0, 2)  // Şerife Çelik'ten 2 ilan
    ];
  }

  get aktifIlanlar() {
    // 3'lü slider: aktifIndex, aktifIndex+1, aktifIndex+2
    const ilanlar = [];
    for (let i = 0; i < 3; i++) {
      ilanlar.push(this.oneCikanlar[(this.aktifIndex + i) % this.oneCikanlar.length]);
    }
    return ilanlar;
  }

  ileri() {
    if (this.animating) return;
    this.kaymaYonu = 'left';
    this.animating = true;
    setTimeout(() => {
      this.aktifIndex = (this.aktifIndex + 1) % this.oneCikanlar.length;
      this.animating = false;
      this.kaymaYonu = 'none';
    }, 500);
  }

  geri() {
    if (this.animating) return;
    this.kaymaYonu = 'right';
    this.animating = true;
    setTimeout(() => {
      this.aktifIndex = (this.aktifIndex - 1 + this.oneCikanlar.length) % this.oneCikanlar.length;
      this.animating = false;
      this.kaymaYonu = 'none';
    }, 500);
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
