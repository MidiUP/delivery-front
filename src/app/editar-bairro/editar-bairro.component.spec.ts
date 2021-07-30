import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBairroComponent } from './editar-bairro.component';

describe('EditarBairroComponent', () => {
  let component: EditarBairroComponent;
  let fixture: ComponentFixture<EditarBairroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBairroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
