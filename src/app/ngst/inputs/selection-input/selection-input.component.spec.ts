import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInputComponent } from './selection-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Column } from '../../table/ngst-model';
import { SelectionMap} from '../../table/ngst-model';


class MockSelectionMap {
  options(){

  }
}

describe('SelectionInputComponent', () => {
  let component: SelectionInputComponent;
  let fixture: ComponentFixture<SelectionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionInputComponent ],
      providers: [{provide: SelectionMap, useClass: MockSelectionMap}],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionInputComponent);
    component = fixture.componentInstance;
    component.column = new Column('a', 'b');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
