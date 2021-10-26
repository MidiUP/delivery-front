import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBairroComponent } from './dialog-delete-bairro.component';

describe('DialogDeleteBairroComponent', () => {
  let component: DialogDeleteBairroComponent;
  let fixture: ComponentFixture<DialogDeleteBairroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteBairroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
