import { RenderMode, ServerRoute } from '@angular/ssr';
import { datas } from '../../public/assets/datas/generic-datas/data';
import { BLOG_POSTS } from '../../public/assets/datas/generic-datas/blog/data'; 

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'danisman/:url',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return datas.map((danisman: any) => ({ url: danisman.url.toString() }));
    }
  },
  {
    path: 'ilan/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const allIlanIds: { id: string }[] = [];
      datas.forEach((danisman: any) => {
        danisman.properties.forEach((property: any) => {
          allIlanIds.push({ id: property.id });
        });
      });
      return allIlanIds;
    }
  },
  {
    path: 'ilan-listesi/:durum',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ durum: 'all' }, { durum: 'satilik' }, { durum: 'kiralik' }];
    }
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
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return BLOG_POSTS.map(post => ({ slug: post.slug })); // BLOG_POSTS kullanılıyor
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];