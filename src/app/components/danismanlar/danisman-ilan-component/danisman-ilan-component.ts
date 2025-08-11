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
  selector: 'app-danisman-properties-grid',
  standalone: true,
  imports: [CommonModule, NgFor, DecimalPipe, MatIconModule, RouterModule],
  templateUrl: './danisman-ilan-component.html',
  styleUrls: ['./danisman-ilan-component.css']
})
export class ConsultantPropertiesGridComponent {
  @Input() properties: Property[] = [];
}
