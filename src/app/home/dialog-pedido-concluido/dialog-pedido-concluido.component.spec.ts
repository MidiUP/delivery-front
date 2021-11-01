import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPedidoConcluidoComponent } from './dialog-pedido-concluido.component';

describe('DialogPedidoConcluidoComponent', () => {
  let component: DialogPedidoConcluidoComponent;
  let fixture: ComponentFixture<DialogPedidoConcluidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPedidoConcluidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPedidoConcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
