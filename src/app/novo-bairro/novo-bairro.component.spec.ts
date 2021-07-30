import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoBairroComponent } from './novo-bairro.component';

describe('NovoBairroComponent', () => {
  let component: NovoBairroComponent;
  let fixture: ComponentFixture<NovoBairroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoBairroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
