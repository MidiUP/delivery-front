import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCarrinhoMobileComponent } from './dialog-carrinho-mobile.component';

describe('DialogCarrinhoMobileComponent', () => {
  let component: DialogCarrinhoMobileComponent;
  let fixture: ComponentFixture<DialogCarrinhoMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCarrinhoMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCarrinhoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
