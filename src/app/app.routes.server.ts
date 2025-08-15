// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Kök ve statikler dâhil her şeyi SSR yapıyoruz:
  { path: '',                 renderMode: RenderMode.Server },
  { path: 'main-menu',        renderMode: RenderMode.Server },
  { path: 'hakkimizda',       renderMode: RenderMode.Server },
  { path: 'iletisim',         renderMode: RenderMode.Server },

  // Parametreli rotalar zaten SSR kalmalı:
  { path: 'ilan-listesi/:durum', renderMode: RenderMode.Server },
  { path: 'danisman/:url',       renderMode: RenderMode.Server },
  { path: 'blog/:id',            renderMode: RenderMode.Server },

  // Fallback
  { path: '**', renderMode: RenderMode.Server },
];
