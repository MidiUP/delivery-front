import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagamentoComponent } from './metodo-pagamento.component';

describe('MetodoPagamentoComponent', () => {
  let component: MetodoPagamentoComponent;
  let fixture: ComponentFixture<MetodoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
