import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAdicionalComponent } from './dialog-delete-adicional.component';

describe('DialogDeleteAdicionalComponent', () => {
  let component: DialogDeleteAdicionalComponent;
  let fixture: ComponentFixture<DialogDeleteAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
