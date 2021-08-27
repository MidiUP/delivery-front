import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressNullComponent } from './address-null.component';

describe('AddressNullComponent', () => {
  let component: AddressNullComponent;
  let fixture: ComponentFixture<AddressNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressNullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
