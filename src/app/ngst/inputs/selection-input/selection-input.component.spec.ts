import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInputComponent } from './selection-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SelectionInputComponent', () => {
  let component: SelectionInputComponent;
  let fixture: ComponentFixture<SelectionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionInputComponent ],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
