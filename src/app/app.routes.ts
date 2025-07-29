import { Routes } from '@angular/router';
import { MainMenu } from './pages/main-menu/main-menu';

export const routes: Routes = [
  { path: '', component: MainMenu },
  {
    path: 'danisman/:url',
    loadComponent: () => import('./pages/danismanlar/danisman').then(m => m.Danisman)
  },
  {
    path: 'ilan/:id',
    loadComponent: () => import('./pages/ilan-detay/ilan-detay').then(m => m.IlanDetayComponent)
  },
  {
    path: 'ilan-listesi/:durum',
    loadComponent: () => import('./pages/ilan-listesi/ilan-listesi').then(m => m.IlanListesi)
  },
  {
    path: 'hakkimizda',
    loadComponent: () => import('./pages/hakkimizda/hakkimizda').then(m => m.HakkimizdaComponent)
  },
  {
    path: 'iletisim',
    loadComponent: () => import('./pages/iletisim/iletisim').then(m => m.IletisimComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-detail/blog-detail').then(m => m.BlogDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
