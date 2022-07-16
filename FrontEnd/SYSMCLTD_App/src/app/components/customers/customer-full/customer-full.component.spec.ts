import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFullComponent } from './customer-full.component';

describe('CustomerFullComponent', () => {
  let component: CustomerFullComponent;
  let fixture: ComponentFixture<CustomerFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
