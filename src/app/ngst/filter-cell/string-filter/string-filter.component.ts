import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterCellComponent} from '../filter-cell';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'ngst-string-filter',
  templateUrl: './string-filter.component.html',
})
export class StringFilterComponent extends FilterCellComponent {
  @Input() label: string;
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();
  stringValue = '';

  filter() {
    const value = this.stringValue;
    this.applyFilter.emit(function(data, c) {
      return !isNullOrUndefined(data[c]) && data[c].toLowerCase().includes(value);
    });
  }

  clear() {
    this.stringValue = '';
  }
}
