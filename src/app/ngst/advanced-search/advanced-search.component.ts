import {Component, Input, OnInit} from '@angular/core';
import {BooleanFormatter, DigitsOfPrecisionFormatter, IntegerFormatter, StringFormatter} from '../table/ngst-model';

@Component({
  selector: 'ngst-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  @Input() column;
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

}
