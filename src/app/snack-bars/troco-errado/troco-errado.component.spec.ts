import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocoErradoComponent } from './troco-errado.component';

describe('TrocoErradoComponent', () => {
  let component: TrocoErradoComponent;
  let fixture: ComponentFixture<TrocoErradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrocoErradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocoErradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
