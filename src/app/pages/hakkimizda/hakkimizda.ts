import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer'; // ✅ footer'ı ekle

@Component({
  selector: 'app-hakkimizda',
  standalone: true,
  imports: [CommonModule, Footer], // ✅ footer imports'a eklendi
  templateUrl: './hakkimizda.html',
  styleUrls: ['./hakkimizda.css']
})
export class Hakkimizda {}
