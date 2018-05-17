import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Column} from './ngst-model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {NewRowDialogComponent} from '../new-row-dialog/new-row-dialog.component';
import {isNullOrUndefined} from 'util';

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
  @Input() canClick: boolean;

  @Output() rowChanged: EventEmitter<RowChangedEvent> = new EventEmitter();
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter();
  @Output() rowAdded: EventEmitter<any> = new EventEmitter();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rawDataSource: MatTableDataSource<any> = new MatTableDataSource();
  paginatedDataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnIndexes: Array<string> = [];

  editRow: any;
  editColumn: Column;

  pageSize: number = 10;
  pageIndex: number = 0;
  rows: number = 0;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    // this.updateTable();
  }

  ngOnChanges() {
    this.updateTable();
  }

  ngAfterViewInit() {
  }

  updateTable() {
    this.rawDataSource.data = this.rowData;
    this.rawDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
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

    this.rows = this.rowData.length;

    this.doSort();
  }

  doSort() {
    this.rawDataSource.data = this.rawDataSource.sortData(this.rowData, this.sort);


    const pe = new PageEvent();
    pe.pageIndex = this.pageIndex;
    pe.pageSize = this.pageSize;
    this.paginate(pe);
  }

  paginate(page: PageEvent) {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    const r0 = page.pageIndex * page.pageSize;
    this.paginatedDataSource.data = this.rawDataSource.data.slice(r0, r0 + page.pageSize);
  }

  isEmpty(value: any) {
    return isNullOrUndefined(value) || value === '';
  }

  clickCell(rowData: any, column: Column) {
    this.editRow = rowData;
    this.editColumn = column;
  }

  clickRow(row: any) {
    if (this.canClick) {
      this.rowClicked.emit(row);
    }
  }

  changeRow(row: any, column: Column, newValue: any) {
    // Clone the user's data
    const clone = Object.assign({}, ...row);

    // Mutate the clone
    column.editor.edit(clone, column, newValue);

    // Let the user know that a change has occurred
    this.rowChanged.emit(new RowChangedEvent(row, clone, column, newValue));
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

  columnLabel(column: Column) {
    return 'ngst-' + column.accessor;
  }
}

export class RowChangedEvent {
  constructor(public row: any, public clonedRow, public column: Column, public newValue: any) {
  }
}
