import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { Footer } from '../footer/footer';

import { MainMenuHeroComponent } from '../../components/main-menu/main-menu-hero-component/main-menu-hero-component';
import { ConsultantsBlockComponent } from '../../components/main-menu/consultants-block-component/consultants-block-component';
import { FeaturedListingsSliderComponent } from '../../components/main-menu/featured-listings-slider-component/featured-listings-slider-component';
import { OfficeLocationBlockComponent } from '../../components/main-menu/office-location-block-component/office-location-block-component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    Footer,
    CommonModule,
    RouterModule,
    MainMenuHeroComponent,
    ConsultantsBlockComponent,
    FeaturedListingsSliderComponent,
    OfficeLocationBlockComponent
  ],
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.css']
})
export class MainMenu implements AfterViewInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // URL fragment varsa danışman bloğuna kaydır
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'danisman-blok') {
        setTimeout(() => {
          const el = document.getElementById('danisman-blok');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }

  ngOnDestroy(): void {}
}
