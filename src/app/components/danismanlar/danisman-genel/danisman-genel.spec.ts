import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantOverviewComponent } from './danisman-genel';

describe('ConsultantOverviewComponent', () => {
  let component: ConsultantOverviewComponent;
  let fixture: ComponentFixture<ConsultantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultantOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
