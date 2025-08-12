import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanListesiFilterBarComponent } from './ilan-listesi-filter-bar-component';

describe('IlanListesiFilterBarComponent', () => {
  let component: IlanListesiFilterBarComponent;
  let fixture: ComponentFixture<IlanListesiFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanListesiFilterBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanListesiFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
