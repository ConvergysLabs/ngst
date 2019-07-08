import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCellWrapperComponent } from './filter-cell-wrapper.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FilterCellWrapperComponent', () => {
  let component: FilterCellWrapperComponent;
  let fixture: ComponentFixture<FilterCellWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCellWrapperComponent ],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCellWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
