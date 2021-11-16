import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBannerComponent } from './dialog-delete-banner.component';

describe('DialogDeleteBannerComponent', () => {
  let component: DialogDeleteBannerComponent;
  let fixture: ComponentFixture<DialogDeleteBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
