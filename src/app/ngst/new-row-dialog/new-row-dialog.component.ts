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

  constructor(public dialogRef: MatDialogRef<NewRowDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.columns = data;
  }

  change(column: Column, newValue: any) {
    this.newRow[column.accessor] = newValue;
  }

  ngOnInit() {
  }

  isValid() {
    return true;
  }
}
