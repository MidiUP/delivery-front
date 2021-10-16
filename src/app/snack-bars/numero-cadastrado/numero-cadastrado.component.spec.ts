import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroCadastradoComponent } from './numero-cadastrado.component';

describe('NumeroCadastradoComponent', () => {
  let component: NumeroCadastradoComponent;
  let fixture: ComponentFixture<NumeroCadastradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeroCadastradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
