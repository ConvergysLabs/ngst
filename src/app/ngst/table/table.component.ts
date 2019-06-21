import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Column, Action} from './ngst-model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';
import {NewRowDialogComponent} from '../new-row-dialog/new-row-dialog.component';
import {isNullOrUndefined} from 'util';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FilterCellWrapperComponent} from '../filter-cell/filter-cell-wrapper.component';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 100,
  touchendHideDelay: 500
};

@Component({
  selector: 'ngst-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ 
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults} 
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],


})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() title: string;
  @Input() columns: Array<Column> = [];
  @Input() rowData: Array<any> = [];
  @Input() actions: Array<Action> = []; // User input actions
  @Input() pageSize = 10;
  @Input() filters = false;
  @Input() canDelete: boolean;
  @Input() canEdit: boolean;
  @Input() canCreate: boolean;
  @Input() canClick: boolean;

  @Output() rowChanged: EventEmitter<RowChangedEvent> = new EventEmitter();
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter();
  @Output() rowAdded: EventEmitter<any> = new EventEmitter();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter();
  @Output() filterChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(FilterCellWrapperComponent) filterCells: Array<FilterCellWrapperComponent>
  rawDataSource: MatTableDataSource<any> = new MatTableDataSource();
  paginatedDataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnIndexes: Array<string> = [];

  combinedActions: Array<Action> = [];
  deletAction: Action = new Action('delete', 'delete', 'Delete Item');

  editRow: any;
  editColumn: Column;
  showActions: boolean;
  pageIndex: number = 0;
  rows: number = 0;
  changeRowValue: boolean = false;

  filtersOpen = false;
  filtersObj = {};

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    for (let row of this.rowData) {
      for (let column of this.columns) {
        const currentRowValue = column.getRowValue(row);
        column.setRowValueError(row, currentRowValue);
      }
    }
  }

  ngOnChanges(changes) {
    if (changes.columns && changes.columns.currentValue !== changes.columns.previousValue) {
      this.clearFilters();
    }
    this.updateTable();
  }

  ngAfterViewInit() {
  }

  updateTable() {    

    this.rawDataSource.paginator = this.paginator;

    this.columnIndexes = [];

    this.setActionColumn();

    this.columnIndexes.push(...this.columns.map(c => c.label));

    // Reset editors
    this.editRow = null;
    this.editColumn = null;

    this.rows = this.rowData.length;    
    //Prevent automatic sort
    if(!this.changeRowValue){
      this.rawDataSource.data = this.rowData;
      this.rawDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
        // Get the column with the header id
        const column = this.columns.filter(c => c.label === sortHeaderId)[0];
        return column.getRowValue(data);
      };

      this.pageIndex = 0;
      this.doSort();
    }else{
      this.changeRowValue = false;
      this.doPaginate();

      this.sort.active = '';
      this.sort._stateChanges.next();
    }  
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
    if (this.combinedActions.length > 0 || this.filters) {
      this.showActions = true;
      this.columnIndexes.push('ngst-actions');
    }
  }

  doSort() {
    this.rawDataSource.data = this.rawDataSource.sortData(this.rowData, this.sort);
    this.doPaginate();
  }

  doPaginate(){
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
    //Flag for change flow on update table
    this.changeRowValue = true;

    // Clone the user's data
    const clone = Object.assign({}, ...row);
    const oldValue = column.getRowValue(row);

    column.setRowValueError(clone, newValue);
    const rowValueError = column.getRowValueError(clone);

    // Trigger the RowChangedEvent to revert the display and fix the focus
    if (rowValueError) {
      this.rowChanged.emit(new RowChangedEvent(row, clone, column, oldValue));
      return;
    }
    
    // Update the clone with the new value
    column.editRowValue(clone, newValue);

    const rowFound = this.rawDataSource.data.indexOf(row);
    this.rawDataSource.data[rowFound] = clone;

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
    if(row.disabledActionNames && row.disabledActionNames.includes(action.name)){
      return true;
    }

    if(row.enabledActionNames && row.enabledActionNames.includes(action.name)){
      return false;
    }
    return row.disabled;
  }

  toggleFilters() {
    this.filtersOpen = !this.filtersOpen;
  }

  applyFilter(filterFunction, column: Column) {
    this.filtersObj[column.accessor] = filterFunction;

    const setfilters = this.setfilters(this.filtersObj);
    this.filterChanged.emit(this.filtersObj);

    this.rawDataSource.filterPredicate = function(data, filter: string): boolean {
      return setfilters(data);
    };

    if(Object.keys(this.filtersObj).length > 0){
      this.rawDataSource.filter = 'This kicks off filters';
    } else {
      this.rawDataSource.filter = '';
    }
  }

  setfilters(filters) {
    const keys = Object.keys(filters);
    return (data) => {
      return keys.reduce((p,c) => {
        return p && filters[c](data, c)
      }, true);
    }
  }

  clearFilters() {
    if (this.filterCells) {
      this.filterCells.map(cell => {
        cell.clear();
      });
    }

    this.filtersObj = {};
    this.rawDataSource.filter = '';
  }
}

export class RowChangedEvent {
  constructor(public row: any, public clonedRow, public column: Column, public newValue: any) {
  }
}
