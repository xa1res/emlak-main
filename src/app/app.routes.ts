import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ilan-listesi/all' },

  { path: 'ilan-listesi', pathMatch: 'full', redirectTo: 'ilan-listesi/all' },
  {
    path: 'ilan-listesi/:durum',
    loadComponent: () =>
      import('./pages/ilan-listesi/ilan-listesi').then(m => m.IlanListesi),
  },

  {
    path: 'ilan/:id',
    loadComponent: () =>
      import('./pages/ilan-detay/ilan-detay').then(m => m.IlanDetayComponent),
  },

  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog').then(m => m.Blog),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail').then(m => m.BlogDetail),
  },

  {
    path: 'hakkimizda',
    loadComponent: () =>
      import('./pages/hakkimizda/hakkimizda').then(m => m.Hakkimizda),
  },
  {
    path: 'iletisim',
    loadComponent: () =>
      import('./pages/iletisim/iletisim').then(m => m.Iletisim),
  },
  {
  path: 'danisman/:url',
  loadComponent: () =>
    import('./pages/danismanlar/danisman').then(m => m.Danisman),
}


  ,{ path: '**', redirectTo: 'ilan-listesi/all' },
];
