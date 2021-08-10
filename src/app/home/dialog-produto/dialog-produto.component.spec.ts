import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProdutoComponent } from './dialog-produto.component';

describe('DialogProdutoComponent', () => {
  let component: DialogProdutoComponent;
  let fixture: ComponentFixture<DialogProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
