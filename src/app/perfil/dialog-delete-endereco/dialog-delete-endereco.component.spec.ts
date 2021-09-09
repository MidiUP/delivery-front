import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteEnderecoComponent } from './dialog-delete-endereco.component';

describe('DialogDeleteEnderecoComponent', () => {
  let component: DialogDeleteEnderecoComponent;
  let fixture: ComponentFixture<DialogDeleteEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
