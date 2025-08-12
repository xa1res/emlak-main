import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'; 

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatMenuModule 
  ],
  templateUrl: './menu-bar.html',
  styleUrls: ['./menu-bar.css']
})
export class MenuBar implements OnInit {
  searchText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  performSearch(): void {
    if (this.searchText.trim()) {
      this.router.navigate(['/ilan-listesi/all'], { queryParams: { search: this.searchText.trim() } });
    } else {
      this.router.navigate(['/ilan-listesi/all']);
    }
    this.searchText = '';
  }
}