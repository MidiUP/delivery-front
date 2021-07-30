import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizacaoComponent } from './personalizacao.component';

describe('PersonalizacaoComponent', () => {
  let component: PersonalizacaoComponent;
  let fixture: ComponentFixture<PersonalizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
