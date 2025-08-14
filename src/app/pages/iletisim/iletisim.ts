import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-iletisim',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, // ✅ Angular Material ikon modülü eklendi
    Footer
  ],
  templateUrl: './iletisim.html',
  styleUrls: ['./iletisim.css']
})
export class Iletisim {
  // Bileşen kodların burada
}
