import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Danisman {
  foto: string;
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
  selector: 'app-danisman-overview',
  standalone: true,
  imports: [CommonModule, NgIf, MatIconModule],
  templateUrl: './danisman-genel-component.html',
  styleUrls: ['./danisman-genel-component.css']
})
export class ConsultantOverviewComponent {
  @Input() consultant: Danisman | undefined;

  getShortenedHakkimda(text: string | undefined): string {
    if (!text) {
      return '';
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
