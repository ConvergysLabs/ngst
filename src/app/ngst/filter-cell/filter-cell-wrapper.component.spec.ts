import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCellWrapperComponent } from './filter-cell-wrapper.component';

describe('FilterCellWrapperComponent', () => {
  let component: FilterCellWrapperComponent;
  let fixture: ComponentFixture<FilterCellWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCellWrapperComponent ]
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
