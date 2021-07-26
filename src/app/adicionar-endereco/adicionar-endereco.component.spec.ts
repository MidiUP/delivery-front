import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEnderecoComponent } from './adicionar-endereco.component';

describe('AdicionarEnderecoComponent', () => {
  let component: AdicionarEnderecoComponent;
  let fixture: ComponentFixture<AdicionarEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
