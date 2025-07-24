import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Footer } from '../footer/footer'; 
import { datas } from '../../../../public/assets/datas/generic-datas/data';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    NgFor,
    Footer 
  ],
  templateUrl: './ilan-detay.html',
  styleUrl: './ilan-detay.css'
})
export class IlanDetayComponent implements OnInit {
  ilan: Ilan | undefined;
  danisman: Danisman | undefined;
  mainImageUrl: string = '';
  imageGalleryUrls: string[] = [];
  displayedThumbnails: string[] = [];
  selectedIndex: number = 0;
  readonly MAX_VISIBLE_THUMBNAILS: number = 7;
  readonly THUMBNAIL_BUFFER_SIZE: number = 3; // Yeni: İlk ve son 3 resmi sabit tutma eşiği

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const ilanId = params.get('id');
      if (ilanId) {
        for (const danismanData of datas) {
          const foundIlan = danismanData.properties.find((p: Ilan) => p.id === ilanId);
          if (foundIlan) {
            this.ilan = foundIlan as Ilan;
            this.danisman = danismanData as Danisman;
            this.setupImageGallery();
            break;
          }
        }
      }
    });
  }

  setupImageGallery(): void {
    if (!this.ilan || this.ilan.imageCount === 0) {
      this.mainImageUrl = '/assets/pentanestlogo.png';
      this.imageGalleryUrls = [];
      this.displayedThumbnails = [];
      this.selectedIndex = 0;
      return;
    }

    this.imageGalleryUrls = [];
    for (let i = 1; i <= this.ilan.imageCount; i++) {
      this.imageGalleryUrls.push(`/assets/datas/generic-datas/ilan-foto/${this.ilan.id}-${i}.png`);
    }

    this.selectedIndex = 0;
    this.mainImageUrl = this.imageGalleryUrls[this.selectedIndex];
    this.updateDisplayedThumbnails();
  }

  selectImage(url: string): void {
    this.mainImageUrl = url;
    this.selectedIndex = this.imageGalleryUrls.indexOf(url);
    this.updateDisplayedThumbnails();
  }

  updateDisplayedThumbnails(): void {
    const totalImages = this.imageGalleryUrls.length;
    const numVisible = this.MAX_VISIBLE_THUMBNAILS;
    const halfVisible = Math.floor(numVisible / 2);
    const buffer = this.THUMBNAIL_BUFFER_SIZE;

    let startIndex: number;
    let endIndex: number;

    if (totalImages <= numVisible) {
      // Toplam resim sayısı görünür limitten azsa veya eşitse, hepsini göster
      startIndex = 0;
      endIndex = totalImages;
    } else if (this.selectedIndex < buffer) {
      // Başlangıç buffer'ı içinde ise, ilk resimden başla
      startIndex = 0;
      endIndex = numVisible;
    } else if (this.selectedIndex >= totalImages - buffer) {
      // Bitiş buffer'ı içinde ise, son resimden geriye doğru başla
      startIndex = totalImages - numVisible;
      endIndex = totalImages;
    } else {
      // Orta kısımda ise, seçilen resmi ortalamaya çalış
      startIndex = this.selectedIndex - halfVisible;
      endIndex = startIndex + numVisible;
    }
    this.displayedThumbnails = this.imageGalleryUrls.slice(startIndex, endIndex);
  }

  navigateThumbnails(direction: 'left' | 'right'): void {
    const newIndex = direction === 'left' ? this.selectedIndex - 1 : this.selectedIndex + 1;

    if (newIndex >= 0 && newIndex < this.imageGalleryUrls.length) {
      this.selectedIndex = newIndex;
      this.mainImageUrl = this.imageGalleryUrls[this.selectedIndex];
      this.updateDisplayedThumbnails();
    }
  }

  get aciklamaSatirlari(): string[] {
    return this.ilan?.aciklama
      ? this.ilan.aciklama.split('\n').filter((line: string) => line.trim())
      : [];
  }
  
  public getGuvenliUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get isLeftArrowDisabled(): boolean {
    return this.selectedIndex === 0;
  }

  get isRightArrowDisabled(): boolean {
    return this.selectedIndex === this.imageGalleryUrls.length - 1;
  }
}