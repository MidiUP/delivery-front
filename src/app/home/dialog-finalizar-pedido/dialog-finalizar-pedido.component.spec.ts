import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinalizarPedidoComponent } from './dialog-finalizar-pedido.component';

describe('DialogFinalizarPedidoComponent', () => {
  let component: DialogFinalizarPedidoComponent;
  let fixture: ComponentFixture<DialogFinalizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinalizarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinalizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
