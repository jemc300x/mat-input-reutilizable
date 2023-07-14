import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputComponent } from './ui-input.component';

describe('UiInputComponent', () => {
  let component: UiInputComponent;
  let fixture: ComponentFixture<UiInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiInputComponent]
    });
    fixture = TestBed.createComponent(UiInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
