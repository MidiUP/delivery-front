import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarAdicionalComponent } from './dialog-criar-adicional.component';

describe('DialogCriarAdicionalComponent', () => {
  let component: DialogCriarAdicionalComponent;
  let fixture: ComponentFixture<DialogCriarAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCriarAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCriarAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
