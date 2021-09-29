import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarAdicionalComponent } from './dialog-editar-adicional.component';

describe('DialogEditarAdicionalComponent', () => {
  let component: DialogEditarAdicionalComponent;
  let fixture: ComponentFixture<DialogEditarAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
