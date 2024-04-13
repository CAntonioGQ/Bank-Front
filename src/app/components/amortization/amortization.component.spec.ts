import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationComponent } from './amortization.component';

describe('AmortizationComponent', () => {
  let component: AmortizationComponent;
  let fixture: ComponentFixture<AmortizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmortizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmortizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
