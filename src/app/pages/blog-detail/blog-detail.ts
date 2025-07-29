import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { BLOG_POSTS } from '../../../../public/assets/datas/generic-datas/blog/data';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetailComponent implements OnInit {
  blogPost: any;

  private allBlogPosts = BLOG_POSTS; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const slug = params.get('slug');
      if (slug) {
        this.blogPost = this.allBlogPosts.find(post => post.slug === slug);
      }
    });
  }
}