import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaDiferenteRepetirComponent } from './senha-diferente-repetir.component';

describe('SenhaDiferenteRepetirComponent', () => {
  let component: SenhaDiferenteRepetirComponent;
  let fixture: ComponentFixture<SenhaDiferenteRepetirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenhaDiferenteRepetirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhaDiferenteRepetirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
