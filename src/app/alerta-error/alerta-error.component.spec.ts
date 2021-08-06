import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaErrorComponent } from './alerta-error.component';

describe('AlertaErrorComponent', () => {
  let component: AlertaErrorComponent;
  let fixture: ComponentFixture<AlertaErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
