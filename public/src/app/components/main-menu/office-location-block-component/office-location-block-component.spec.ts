import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLocationBlockComponent } from './office-location-block-component';

describe('OfficeLocationBlockComponent', () => {
  let component: OfficeLocationBlockComponent;
  let fixture: ComponentFixture<OfficeLocationBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeLocationBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeLocationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
