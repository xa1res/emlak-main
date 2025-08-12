import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsBlockComponent } from './consultants-block-component';

describe('ConsultantsBlockComponent', () => {
  let component: ConsultantsBlockComponent;
  let fixture: ComponentFixture<ConsultantsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultantsBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
