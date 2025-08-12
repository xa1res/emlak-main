import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanOzelliklerComponent } from './ilan-ozellikler-component';

describe('IlanOzelliklerComponent', () => {
  let component: IlanOzelliklerComponent;
  let fixture: ComponentFixture<IlanOzelliklerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlanOzelliklerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanOzelliklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
