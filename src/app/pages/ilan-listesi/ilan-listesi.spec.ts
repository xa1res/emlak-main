import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanListesi } from './ilan-listesi';

describe('IlanListesi', () => {
  let component: IlanListesi;
  let fixture: ComponentFixture<IlanListesi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanListesi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanListesi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
