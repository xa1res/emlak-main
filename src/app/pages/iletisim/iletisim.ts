import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer'; // Footer bileşenini dahil edin
import { MatIconModule } from '@angular/material/icon'; // MatIconModule'ü dahil edin

@Component({
  selector: 'app-iletisim',
  standalone: true,
  imports: [CommonModule, Footer, MatIconModule], // MatIconModule'ü imports dizisine ekleyin
  templateUrl: './iletisim.html',
  styleUrl: './iletisim.css'
})
export class IletisimComponent {

}