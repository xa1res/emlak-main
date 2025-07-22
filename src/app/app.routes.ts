import { Routes } from '@angular/router';
import { MainMenu } from './pages/main-menu/main-menu';
import { Danisman } from './pages/danismanlar/danisman';
import { IlanDetayComponent } from './pages/ilan-detay/ilan-detay';

export const routes: Routes = [
  { path: '', component: MainMenu },
  { path: 'main-menu', component: MainMenu },
  { path: 'danisman/:url', component: Danisman },
  { path: 'ilan/:id', component: IlanDetayComponent },
];