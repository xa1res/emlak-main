import { Routes } from '@angular/router';
import { MainMenu } from './pages/main-menu/main-menu';
import { Danisman } from './pages/danismanlar/danisman';
import { IlanDetayComponent } from './pages/ilan-detay/ilan-detay';
import { IlanListesi } from './pages/ilan-listesi/ilan-listesi';
import { HakkimizdaComponent } from './pages/hakkimizda/hakkimizda';
import { IletisimComponent } from './pages/iletisim/iletisim';
import { BlogComponent } from './pages/blog/blog';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail';

export const routes: Routes = [
  { path: '', component: MainMenu },
  { path: 'danisman/:url', component: Danisman },
  { path: 'ilan/:id', component: IlanDetayComponent },
  { path: 'ilan-listesi/:durum', component: IlanListesi },
  { path: 'hakkimizda', component: HakkimizdaComponent },
  { path: 'iletisim', component: IletisimComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: '**', redirectTo: '' }
];