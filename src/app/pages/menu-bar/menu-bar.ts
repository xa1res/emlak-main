import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-bar.html',
  styleUrls: ['./menu-bar.css']
})
export class MenuBar {}
