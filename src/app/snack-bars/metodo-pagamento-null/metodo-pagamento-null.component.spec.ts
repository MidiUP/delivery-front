import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagamentoNullComponent } from './metodo-pagamento-null.component';

describe('MetodoPagamentoNullComponent', () => {
  let component: MetodoPagamentoNullComponent;
  let fixture: ComponentFixture<MetodoPagamentoNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoPagamentoNullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoPagamentoNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
