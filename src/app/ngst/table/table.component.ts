import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Column} from './ngst-model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NewRowDialogComponent} from '../new-row-dialog/new-row-dialog.component';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'ngst-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() title: string;
  @Input() columns: Array<Column> = [];
  @Input() rowData: Array<any> = [];
  @Input() canDelete: boolean;
  @Input() canEdit: boolean;
  @Input() canCreate: boolean;

  @Output() rowChanged: EventEmitter<RowChangedEvent> = new EventEmitter();
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter();
  @Output() rowAdded: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnIndexes: Array<string> = [];

  editRow: any;
  editColumn: Column;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    // this.updateTable();
  }

  ngOnChanges() {
    this.updateTable();
  }

  ngAfterViewInit() {
    this.sortAndPaginate();
  }

  updateTable() {
    this.dataSource.data = this.rowData;
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
      // Get the column with the header id
      const column = this.columns.filter(c => c.label === sortHeaderId)[0];
      return column.getRowValue(data);
    };

    this.columnIndexes = [];
    if (this.canDelete) {
      this.columnIndexes.push('ngst-actions');
    }
    this.columnIndexes.push(...this.columns.map(c => c.label));

    // Reset editors
    this.editRow = null;
    this.editColumn = null;
  }

  sortAndPaginate() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isEmpty(value: any) {
    return isNullOrUndefined(value);
  }

  click(rowData: any, column: Column) {
    this.editRow = rowData;
    this.editColumn = column;
  }

  changeRow(row: any, column: Column, newValue: any) {
    this.rowChanged.emit(new RowChangedEvent(row, column, newValue));
  }

  deleteRow(row: any) {
    this.rowDeleted.emit(row);
  }

  addRow() {
    const ref = this.dialog.open(NewRowDialogComponent, {
      width: '400px',
      data: this.columns
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.rowAdded.emit(result);
      }
    });
  }
}

export class RowChangedEvent {
  constructor(public row: any, public column: Column, public newValue: any) {
  }
}
