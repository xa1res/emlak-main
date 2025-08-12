import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-menu-office-location-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './office-location-block-component.html', 
  styleUrls: ['./office-location-block-component.css']
})
export class OfficeLocationBlockComponent {
  @Input() locationLink: string = '';
  @Input() officeImageUrl: string = '';
}
