import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalhaLoginComponent } from './falha-login.component';

describe('FalhaLoginComponent', () => {
  let component: FalhaLoginComponent;
  let fixture: ComponentFixture<FalhaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalhaLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FalhaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
