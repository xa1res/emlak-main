import { Component, Input } from '@angular/core';
import { CommonModule, NgIf, NgFor, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
}

@Component({
  selector: 'app-ilan-listesi-grid',
  standalone: true,
  imports: [CommonModule, DecimalPipe, MatIconModule, RouterModule], 
  templateUrl: './ilan-listesi-grid-component.html',
  styleUrls: ['./ilan-listesi-grid-component.css']
})
export class IlanListesiGridComponent {
  @Input() properties: Property[] = [];
}