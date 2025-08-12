import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanDanismanBilgisiComponent } from './ilan-danisman-bilgisi-component';

describe('IlanDanismanBilgisiComponent', () => {
  let component: IlanDanismanBilgisiComponent;
  let fixture: ComponentFixture<IlanDanismanBilgisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanDanismanBilgisiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanDanismanBilgisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
