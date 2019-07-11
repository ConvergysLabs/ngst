import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  BooleanFormatter,
  DigitsOfPrecisionFormatter,
  IntegerFormatter,
  SelectionFormatter,
  StringFormatter
} from '../table/ngst-model';
import {FilterCellComponent} from './filter-cell';

@Component({
  selector: 'ngst-filter-cell',
  templateUrl: './filter-cell-wrapper.component.html',
  styleUrls: ['./filter-cell-wrapper.component.css']
})
export class FilterCellWrapperComponent implements OnInit {
  @Input() column;
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();
  @ViewChild('filterCell') filterCell: FilterCellComponent;

  type = 'other';

  constructor() { }

  ngOnInit() {
    if(this.column){
      if (this.column.formatter instanceof StringFormatter) {
        this.type = 'string';
      } else if (this.column.formatter instanceof IntegerFormatter) {
        this.type = 'int';
      } else if (this.column.formatter instanceof DigitsOfPrecisionFormatter) {
        this.type = 'float';
      } else if (this.column.formatter instanceof BooleanFormatter) {
        this.type = 'bool';
      } else if (this.column.formatter instanceof SelectionFormatter) {
        this.type = 'selection';
      }
    }   
  }

  clear() {
    if (this.filterCell) {
      this.filterCell.clear();
    }
  }
}
