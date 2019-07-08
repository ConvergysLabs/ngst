import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockMatDialogRef, MockMatDialogData, MockMatDialog } from '../../testing/material.mock';
import { MAT_DIALOG_DATA, MatDialog, MatTableModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers:  [{ provide: MatDialog, useValue : MockMatDialog}],
      imports : [MatTableModule, BrowserAnimationsModule ],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
