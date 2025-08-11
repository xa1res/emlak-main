import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer'; 
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-iletisim',
  standalone: true,
  imports: [CommonModule, Footer, MatIconModule], 
  templateUrl: './iletisim.html',
  styleUrl: './iletisim.css'
})
export class IletisimComponent {

}