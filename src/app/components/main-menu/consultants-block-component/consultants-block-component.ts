import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-menu-consultants-block',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultants-block-component.html',
  styleUrls: ['./consultants-block-component.css']
})
export class ConsultantsBlockComponent { }
