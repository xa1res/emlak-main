import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-ilan-detay-image-gallery', 
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './ilan-image-gallery-component.html',
  styleUrls: ['./ilan-image-gallery-component.css'] 
})
export class IlanImageGalleryComponent implements OnInit, OnChanges { 
  @Input() ilanId: string = '';
  @Input() imageCount: number = 0;

  mainImageUrl: string = '';
  imageGalleryUrls: string[] = [];
  displayedThumbnails: string[] = [];
  selectedIndex: number = 0;
  showFullscreenModal: boolean = false;

  readonly MAX_VISIBLE_THUMBNAILS: number = 7;
  readonly THUMBNAIL_BUFFER_SIZE: number = 3;

  ngOnInit(): void {
    this.setupImageGallery();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ilanId'] || changes['imageCount']) {
      this.setupImageGallery();
    }
  }

  setupImageGallery(): void {
    if (!this.ilanId || this.imageCount === 0) {
      this.mainImageUrl = '/assets/pentanestlogo.png'; 
      this.imageGalleryUrls = [];
      this.displayedThumbnails = [];
      this.selectedIndex = 0;
      return;
    }

    this.imageGalleryUrls = [];
    for (let i = 1; i <= this.imageCount; i++) {
      this.imageGalleryUrls.push(`/assets/datas/generic-datas/ilan-foto/${this.ilanId}-${i}.png`);
    }

    this.selectedIndex = 0;
    this.mainImageUrl = this.imageGalleryUrls[this.selectedIndex];
    this.updateDisplayedThumbnails();
  }

  /**
   * @param url Seçilen görselin URL'si.
   */
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
      startIndex = 0;
      endIndex = totalImages;
    } else if (this.selectedIndex < buffer) {
      startIndex = 0;
      endIndex = numVisible;
    } else if (this.selectedIndex >= totalImages - buffer) {
      startIndex = totalImages - numVisible;
      endIndex = totalImages;
    } else {
      startIndex = this.selectedIndex - halfVisible;
      endIndex = startIndex + numVisible;
    }
    this.displayedThumbnails = this.imageGalleryUrls.slice(startIndex, endIndex);
  }

  /**
   * @param direction 
   * @param event 
   */
  navigateThumbnails(direction: 'left' | 'right', event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    const newIndex = direction === 'left' ? this.selectedIndex - 1 : this.selectedIndex + 1;

    if (newIndex >= 0 && newIndex < this.imageGalleryUrls.length) {
      this.selectedIndex = newIndex;
      this.mainImageUrl = this.imageGalleryUrls[this.selectedIndex];
      this.updateDisplayedThumbnails();
    }
  }

  openFullscreen(): void {
    this.showFullscreenModal = true;
  }

  closeFullscreen(): void {
    this.showFullscreenModal = false;
  }

  get isLeftArrowDisabled(): boolean {
    return this.selectedIndex === 0;
  }

  get isRightArrowDisabled(): boolean {
    return this.selectedIndex === this.imageGalleryUrls.length - 1;
  }
}
