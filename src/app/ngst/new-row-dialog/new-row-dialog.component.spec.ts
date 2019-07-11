import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRowDialogComponent } from './new-row-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockMatDialogRef, MockMatDialogData } from '../../testing/material.mock';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Column } from "../table/ngst-model";

describe('NewRowDialogComponent', () => {
  let component: NewRowDialogComponent;
  let fixture: ComponentFixture<NewRowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRowDialogComponent ],
      providers: [{ provide: MAT_DIALOG_DATA, useClass : MockMatDialogData}, { provide: MatDialogRef, useClass : MockMatDialogRef}],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRowDialogComponent);
    component = fixture.componentInstance;
    component.columns = [new Column('a', 'b')];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
