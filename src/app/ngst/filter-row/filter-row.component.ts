import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {BooleanFormatter, DigitsOfPrecisionFormatter, IntegerFormatter, StringFormatter} from '../table/ngst-model';
import {FilterCellComponent} from './filter-cell';

@Component({
  selector: 'ngst-advanced-search',
  templateUrl: './filter-row.component.html',
  styleUrls: ['./filter-row.component.css']
})
export class FilterRowComponent implements OnInit {
  @Input() column;
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();
  @ViewChild('filterCell') filterCell: FilterCellComponent;

  type = 'other';

  constructor() { }

  ngOnInit() {
    if (this.column.formatter instanceof StringFormatter) {
      this.type = 'string';
    } else if (this.column.formatter instanceof IntegerFormatter) {
      this.type = 'int';
    } else if (this.column.formatter instanceof DigitsOfPrecisionFormatter) {
      this.type = 'float';
    } else if (this.column.formatter instanceof BooleanFormatter) {
      this.type = 'bool';
    } else if (this.column.formatter instanceof Selection) {
      this.type = 'selection';
    }
  }

  clear() {
    if (this.filterCell) {
      this.filterCell.clear();
    }
  }
}
