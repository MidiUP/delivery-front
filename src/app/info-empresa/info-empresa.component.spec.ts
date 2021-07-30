import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEmpresaComponent } from './info-empresa.component';

describe('InfoEmpresaComponent', () => {
  let component: InfoEmpresaComponent;
  let fixture: ComponentFixture<InfoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
