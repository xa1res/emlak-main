import { Routes } from '@angular/router';

export const routes: Routes = [
  // Root -> ilan listesine yönlendir
  { path: '', pathMatch: 'full', redirectTo: 'main-menu' },

  // İlan listesi
  { path: 'ilan-listesi', pathMatch: 'full', redirectTo: 'ilan-listesi/all' },
  {
    path: 'ilan-listesi/:durum',
    loadComponent: () =>
      import('./pages/ilan-listesi/ilan-listesi').then(m => m.IlanListesi),
  },

  // İlan detay
  {
    path: 'ilan/:id',
    loadComponent: () =>
      import('./pages/ilan-detay/ilan-detay').then(m => m.IlanDetayComponent),
  },

  // Ana sayfa (mevcut)
  {
    path: 'ana-sayfa',
    loadComponent: () =>
      import('./pages/main-menu/main-menu').then(m => m.MainMenu),
  },

  // >>> Ekledim: /main-menu alias'ı
  {
    path: 'main-menu',
    loadComponent: () =>
      import('./pages/main-menu/main-menu').then(m => m.MainMenu),
  },

  // Danışman profil
  {
    path: 'danisman/:url',
    loadComponent: () =>
      import('./pages/danismanlar/danisman').then(m => m.Danisman),
  },

  // Blog list
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog').then(m => m.Blog),
  },

  // Blog detay
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail').then(m => m.BlogDetail),
  },

  // Hakkımızda
  {
    path: 'hakkimizda',
    loadComponent: () =>
      import('./pages/hakkimizda/hakkimizda').then(m => m.Hakkimizda),
  },

  // İletişim
  {
    path: 'iletisim',
    loadComponent: () =>
      import('./pages/iletisim/iletisim').then(m => m.Iletisim),
  },

  // Fallback
  { path: '**', redirectTo: 'ilan-listesi/all' },
];
