import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMetodoPagamentoComponent } from './editar-metodo-pagamento.component';

describe('EditarMetodoPagamentoComponent', () => {
  let component: EditarMetodoPagamentoComponent;
  let fixture: ComponentFixture<EditarMetodoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMetodoPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMetodoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
