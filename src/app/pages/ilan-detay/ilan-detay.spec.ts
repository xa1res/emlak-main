import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanDetay } from './ilan-detay';

describe('IlanDetay', () => {
  let component: IlanDetay;
  let fixture: ComponentFixture<IlanDetay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanDetay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanDetay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
