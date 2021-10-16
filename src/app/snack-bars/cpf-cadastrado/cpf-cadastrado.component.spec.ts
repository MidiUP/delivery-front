import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfCadastradoComponent } from './cpf-cadastrado.component';

describe('CpfCadastradoComponent', () => {
  let component: CpfCadastradoComponent;
  let fixture: ComponentFixture<CpfCadastradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpfCadastradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
