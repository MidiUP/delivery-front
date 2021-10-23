import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRedefinirSenhaComponent } from './dialog-redefinir-senha.component';

describe('DialogRedefinirSenhaComponent', () => {
  let component: DialogRedefinirSenhaComponent;
  let fixture: ComponentFixture<DialogRedefinirSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRedefinirSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRedefinirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
