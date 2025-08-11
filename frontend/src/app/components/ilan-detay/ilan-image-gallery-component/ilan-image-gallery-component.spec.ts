import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanImageGalleryComponent } from './ilan-image-gallery-component';

describe('IlanImageGalleryComponent', () => {
  let component: IlanImageGalleryComponent;
  let fixture: ComponentFixture<IlanImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanImageGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
