import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanListesiGridComponent } from './ilan-listesi-grid-component';

describe('IlanListesiGridComponent', () => {
  let component: IlanListesiGridComponent;
  let fixture: ComponentFixture<IlanListesiGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanListesiGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanListesiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
