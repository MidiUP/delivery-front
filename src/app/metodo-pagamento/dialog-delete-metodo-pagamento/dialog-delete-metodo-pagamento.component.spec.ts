import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteMetodoPagamentoComponent } from './dialog-delete-metodo-pagamento.component';

describe('DialogDeleteMetodoPagamentoComponent', () => {
  let component: DialogDeleteMetodoPagamentoComponent;
  let fixture: ComponentFixture<DialogDeleteMetodoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteMetodoPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteMetodoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
