import { Component, Input } from '@angular/core';
import { CommonModule, NgIf, NgFor, DecimalPipe } from '@angular/common';

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

@Component({
  selector: 'app-ilan-detay-ozellikler', 
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DecimalPipe],
  templateUrl: './ilan-ozellikler-component.html', 
  styleUrls: ['./ilan-ozellikler-component.css']
})
export class IlanOzelliklerComponent { 
  @Input() ilan: Ilan | undefined;

  get aciklamaSatirlari(): string[] {
    return this.ilan?.aciklama
      ? this.ilan.aciklama.split('\n').filter((line: string) => line.trim())
      : [];
  }
}
