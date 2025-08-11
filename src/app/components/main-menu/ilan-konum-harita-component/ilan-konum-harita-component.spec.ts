import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanKonumHaritaComponent } from './ilan-konum-harita-component';

describe('IlanKonumHaritaComponent', () => {
  let component: IlanKonumHaritaComponent;
  let fixture: ComponentFixture<IlanKonumHaritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanKonumHaritaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanKonumHaritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
