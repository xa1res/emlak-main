import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ilan-detay-konum-harita', 
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './ilan-konum-harita-component.html', 
  styleUrls: ['./ilan-konum-harita-component.css'] 
})
export class IlanKonumHaritaComponent { 
  @Input() haritaUrl: string | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * @param url Harita URL'si.
   * @returns Güvenli kaynak URL'si.
   */
  public getGuvenliUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
