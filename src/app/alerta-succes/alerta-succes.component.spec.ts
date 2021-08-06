import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaSuccesComponent } from './alerta-succes.component';

describe('AlertaSuccesComponent', () => {
  let component: AlertaSuccesComponent;
  let fixture: ComponentFixture<AlertaSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaSuccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
