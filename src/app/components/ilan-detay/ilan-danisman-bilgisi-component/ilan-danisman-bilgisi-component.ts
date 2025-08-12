import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

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
  properties: any[]; 
}

@Component({
  selector: 'app-ilan-detay-danisman-bilgisi', 
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './ilan-danisman-bilgisi-component.html', 
  styleUrls: ['./ilan-danisman-bilgisi-component.css'] 
})
export class IlanDanismanBilgisiComponent { 
  @Input() danisman: Danisman | undefined;
}
