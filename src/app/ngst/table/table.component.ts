import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Column, Action} from './ngst-model';
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
  @Input() actions: Array<Action> = []; // User input actions
  @Input() pageSize = 10;
  @Input() canDelete: boolean;
  @Input() canEdit: boolean;
  @Input() canCreate: boolean;
  @Input() canClick: boolean;
  @Input() componentWrapper: any;

  @Output() rowChanged: EventEmitter<RowChangedEvent> = new EventEmitter();
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter();
  @Output() rowAdded: EventEmitter<any> = new EventEmitter();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rawDataSource: MatTableDataSource<any> = new MatTableDataSource();
  paginatedDataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnIndexes: Array<string> = [];

  combinedActions: Array<Action> = [];
  deletAction: Action = new Action('delete', 'delete');

  editRow: any;
  editColumn: Column;
  showActions: boolean;
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

    this.setActionColumn();

    this.columnIndexes.push(...this.columns.map(c => c.label));

    // Reset editors
    this.editRow = null;
    this.editColumn = null;

    this.rows = this.rowData.length;
    this.pageIndex = 0;
    this.doSort();
  }

  setActionColumn() {
    // Reset
    this.combinedActions = [];

    // Always add delete first, if they want it
    if (this.canDelete) {
      this.combinedActions.push(this.deletAction);
    }

    // Then add user custom actions
    this.combinedActions.push(...this.actions);

    // Show actions column?
    if (this.combinedActions.length > 0) {
      this.showActions = true;
      this.columnIndexes.push('ngst-actions');
    }
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

  runAction(action: Action, row: any) {
    if (action === this.deletAction) {
      this.deleteRow(row);
    } else {
      this.rowAction.emit({
        action: action,
        row: row
      });
    }
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

  checkDisabled(row, action){
    if(row.enabledActionNames && row.enabledActionNames.includes(action.name)){
      return false;
    }
    return row.disabled;
  }
}

export class RowChangedEvent {
  constructor(public row: any, public clonedRow, public column: Column, public newValue: any) {
  }
}
