import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBar } from './pages/menu-bar/menu-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuBar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'proje2';
}
