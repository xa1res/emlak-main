import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './menu-bar.html',
  styleUrls: ['./menu-bar.css']
})
export class MenuBar {}