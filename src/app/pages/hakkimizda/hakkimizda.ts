import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // NgFor kaldırıldı
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-hakkimizda',
  standalone: true,
  imports: [CommonModule, Footer], // NgFor imports dizisinden kaldırıldı
  templateUrl: './hakkimizda.html',
  styleUrl: './hakkimizda.css'
})
export class HakkimizdaComponent {

}