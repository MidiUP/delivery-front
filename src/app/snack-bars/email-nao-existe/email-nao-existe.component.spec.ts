import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNaoExisteComponent } from './email-nao-existe.component';

describe('EmailNaoExisteComponent', () => {
  let component: EmailNaoExisteComponent;
  let fixture: ComponentFixture<EmailNaoExisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailNaoExisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNaoExisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
