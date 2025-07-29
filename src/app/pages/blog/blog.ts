import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { BLOG_POSTS } from '../../../../public/assets/datas/generic-datas/blog/data'; 

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent {
  blogPosts = BLOG_POSTS;
}