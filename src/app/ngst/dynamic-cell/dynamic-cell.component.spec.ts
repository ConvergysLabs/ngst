import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCellComponent } from './dynamic-cell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

describe('DynamicCellComponent', () => {
  let component: DynamicCellComponent;
  let fixture: ComponentFixture<DynamicCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCellComponent],
      imports: [HttpClientModule],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
