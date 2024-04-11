import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLoanComponent } from './add-edit-loan.component';

describe('AddEditLoanComponent', () => {
  let component: AddEditLoanComponent;
  let fixture: ComponentFixture<AddEditLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
