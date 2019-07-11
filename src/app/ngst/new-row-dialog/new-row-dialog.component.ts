import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Column} from '../table/ngst-model';

@Component({
  selector: 'ngst-new-row-dialog',
  templateUrl: './new-row-dialog.component.html',
  styleUrls: ['./new-row-dialog.component.css']
})
export class NewRowDialogComponent implements OnInit {
  newRow = {};
  columns: Array<Column> = [];
  rowData: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<NewRowDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.columns = data.columns;
    this.rowData = data.rowData;
  }

  change(column: Column, newValue: any) {
    column.setRowValueError(this.newRow, newValue, this.rowData, null);

    column.editRowValue(this.newRow, newValue);
  }

  ngOnInit() {
    for (let column of this.columns) {
      column.setRowValueError(this.newRow, undefined, this.rowData, null);
    }
  }

  isValid() {
    for (let column of this.columns) {
      if (column.getRowValueError(this.newRow)) {
        return false;
      }
    }
    
    return true;
  }
}
