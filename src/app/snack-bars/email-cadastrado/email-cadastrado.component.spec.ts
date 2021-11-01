import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCadastradoComponent } from './email-cadastrado.component';

describe('EmailCadastradoComponent', () => {
  let component: EmailCadastradoComponent;
  let fixture: ComponentFixture<EmailCadastradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailCadastradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
