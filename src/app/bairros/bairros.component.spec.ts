import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairrosComponent } from './bairros.component';

describe('BairrosComponent', () => {
  let component: BairrosComponent;
  let fixture: ComponentFixture<BairrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BairrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BairrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
