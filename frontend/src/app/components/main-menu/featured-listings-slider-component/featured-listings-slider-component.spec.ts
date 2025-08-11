import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedListingsSliderComponent } from './featured-listings-slider-component';

describe('FeaturedListingsSliderComponent', () => {
  let component: FeaturedListingsSliderComponent;
  let fixture: ComponentFixture<FeaturedListingsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedListingsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedListingsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
