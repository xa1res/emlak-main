import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-hakkimizda',
  standalone: true,
  imports: [CommonModule, Footer], 
  templateUrl: './hakkimizda.html',
  styleUrl: './hakkimizda.css'
})
export class HakkimizdaComponent {

}