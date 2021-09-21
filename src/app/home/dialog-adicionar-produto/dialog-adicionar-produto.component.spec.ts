import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdicionarProdutoComponent } from './dialog-adicionar-produto.component';

describe('DialogAdicionarProdutoComponent', () => {
  let component: DialogAdicionarProdutoComponent;
  let fixture: ComponentFixture<DialogAdicionarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdicionarProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdicionarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
