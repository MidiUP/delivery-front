import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaisComponent } from './adicionais.component';

describe('AdicionaisComponent', () => {
  let component: AdicionaisComponent;
  let fixture: ComponentFixture<AdicionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
