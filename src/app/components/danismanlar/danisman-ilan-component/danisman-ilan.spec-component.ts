import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantPropertiesGridComponent } from './danisman-ilan-component';

describe('ConsultantPropertiesGridComponent', () => {
  let component: ConsultantPropertiesGridComponent;
  let fixture: ComponentFixture<ConsultantPropertiesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultantPropertiesGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantPropertiesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
