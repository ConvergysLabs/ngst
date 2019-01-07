import {Component, EventEmitter, Output} from '@angular/core';
import {FilterCellComponent} from '../filter-cell';

@Component({
  selector: 'ngst-int-filter',
  templateUrl: './int-filter.component.html',
  styleUrls: ['./int-filter.component.css']
})
export class IntFilterComponent extends FilterCellComponent {
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();

  comparator: string;
  intValue: string;
  comparators = [
    {
      name: 'greaterThan',
      symbol: '>'
    },
    {
      name: 'lessThan',
      symbol: '<'
    },
    {
      name: 'equalTo',
      symbol: '='
    },
    {
      name: 'notEqual',
      symbol: '!='
    },
    {
      name: 'greaterEqual',
      symbol: '>='
    },
    {
      name: 'lesserEqual',
      symbol: '<='
    },
  ];

  intValueChange(e) {
    if (!e.target.value) {
      this.applyFilter.emit(function(data, c) {
        return true;
      });
    } else {
      this.intValue = e.target.value;
      this.intFilter();
    }
  }

  intFilter() {
    if (!this.intValue || !this.comparator) {
      this.applyFilter.emit(function(data, c) {
        return true;
      });
    } else {
      const value = this.intValue;
      switch (this.comparator) {
        case 'greaterThan':
          this.applyFilter.emit(function(data, c) {
            return Number(data[c]) > Number(value);
          });
          break;
        case 'lessThan':
          this.applyFilter.emit(function(data, c) {
            return Number(data[c]) < Number(value);
          });
          break;
        case 'equalTo':
          this.applyFilter.emit(function(data, c) {
            return Number(data[c]) === Number(value);
          });
          break;
        case 'notEqual':
          this.applyFilter.emit(function(data, c) {
            return Number(data[c]) !== Number(value);
          });
          break;
        case 'greaterEqual':
          this.applyFilter.emit(function(data, c) {
            return Number(data[c]) >= Number(value);
          });
          break;
        case 'lesserEqual':
          this.applyFilter.emit(function(data, c) {
            return Number(data[c]) <= Number(value);
          });
          break;
        default:
          this.applyFilter.emit(function(data, c) {
            return true;
          });
      }
    }
  }

  clear() {
    this.intValue = '';
    this.comparator = '';
  }

}
