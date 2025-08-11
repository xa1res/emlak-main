import express, { Request, Response } from 'express';
import cors from 'cors';
import { datas, BLOG_POSTS } from './data';
import { Property, Danisman, BlogPost } from './types';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const allProperties: Property[] = datas.flatMap(danisman => danisman.properties);

app.get('/api/ilanlar', (req: Request, res: Response) => {
  res.json(allProperties);
});

app.get('/api/ilanlar/:id', (req: Request, res: Response) => {
  const ilanId = req.params.id;
  const bulunanIlan = allProperties.find((p: Property) => p.id === ilanId);

  if (bulunanIlan) {
    res.json(bulunanIlan);
  } else {
    res.status(404).send('İlan bulunamadı');
  }
});

app.get('/api/blog', (req: Request, res: Response) => {
  res.json(BLOG_POSTS);
});

app.get('/api/blog/:slug', (req: Request, res: Response) => {
  const blogSlug = req.params.slug;
  const blogPost = BLOG_POSTS.find((post: BlogPost) => post.slug === blogSlug);

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).send('Blog yazısı bulunamadı');
  }
});

app.get('/api/danismanlar', (req: Request, res: Response) => {
  res.json(datas);
});

app.get('/api/danismanlar/:url', (req: Request, res: Response) => {
  const danismanUrl = req.params.url;
  const danisman = datas.find((d: Danisman) => d.url === danismanUrl);

  if (danisman) {
    res.json(danisman);
  } else {
    res.status(404).send('Danışman bulunamadı');
  }
});

app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});