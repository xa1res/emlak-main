import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'danisman/:url',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'ilan/:id',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'ilan-listesi/:durum',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'hakkimizda',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'iletisim',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];