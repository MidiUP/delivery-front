import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPedidoComponent } from './dialog-pedido.component';

describe('DialogPedidoComponent', () => {
  let component: DialogPedidoComponent;
  let fixture: ComponentFixture<DialogPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
