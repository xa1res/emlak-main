import { Component, OnInit } from '@angular/core'; // OnInit eklendi
import { RouterModule, Router, NavigationEnd } from '@angular/router'; // Router ve NavigationEnd eklendi
import { MenuBar } from './pages/menu-bar/menu-bar';
import { filter } from 'rxjs/operators'; // filter operatörü eklendi

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuBar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit { // OnInit uygulandı
  protected title = 'proje2';

  constructor(private router: Router) {} // Router inject edildi

  ngOnInit(): void {
    // Her navigasyon tamamlandığında sayfanın en üstüne kaydır
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0); // Sayfayı en üste kaydır
    });
  }
}