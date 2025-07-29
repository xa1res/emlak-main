import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-main-menu-hero', 
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-menu-hero-component.html', 
  styleUrls: ['./main-menu-hero-component.css']
})
export class MainMenuHeroComponent { }
