import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router'; 

interface BlogPostDetail {
  slug: string;
  author: string;
  date: string;
  title: string;
  image: string;
  snippet: string;
  fullContent: string;
}

@Component({
  selector: 'app-blog-detail-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail-component.html',
  styleUrls: ['./blog-detail-component.css']
})
export class BlogDetailContentComponent {
  @Input() blogPost: BlogPostDetail | undefined;
}