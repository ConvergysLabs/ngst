import {Component} from '@angular/core';
import {RawInputComponent} from '../raw-input/raw-input.component';
import {SelectionFormatter, SelectionMap} from '../../table/ngst-model';

@Component({
  selector: 'ngst-selection-input',
  templateUrl: './selection-input.component.html',
  styleUrls: ['./selection-input.component.css']
})
export class SelectionInputComponent extends RawInputComponent {
  get map(): SelectionMap {
    const formatter = <SelectionFormatter>this.column.formatter;
    return formatter.selectionMap;
  }
}
