import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoMetodoPagamentoComponent } from './novo-metodo-pagamento.component';

describe('NovoMetodoPagamentoComponent', () => {
  let component: NovoMetodoPagamentoComponent;
  let fixture: ComponentFixture<NovoMetodoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoMetodoPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoMetodoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
