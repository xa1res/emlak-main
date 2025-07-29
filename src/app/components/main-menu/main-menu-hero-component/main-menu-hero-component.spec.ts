import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuHeroComponent } from './main-menu-hero-component';

describe('MainMenuHeroComponent', () => {
  let component: MainMenuHeroComponent;
  let fixture: ComponentFixture<MainMenuHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
