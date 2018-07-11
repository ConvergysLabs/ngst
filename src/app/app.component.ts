import {Component} from '@angular/core';
import {
  BooleanFormatter,
  Column, DigitsOfPrecisionFormatter, Editor, IntegerFormatter, PercentFormatter,
  SelectionFormatter, SelectorItem
} from './ngst/table/ngst-model';
import {RawInputComponent} from './ngst/inputs/raw-input/raw-input.component';
import {RowChangedEvent} from './ngst/table/table.component';
import {SelectionInputComponent} from './ngst/inputs/selection-input/selection-input.component';
import {BooleanInputComponent} from './ngst/inputs/boolean-input/boolean-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columns: Array<Column> = [];
  rowData: Array<Thing> = [];

  constructor() {
    /* Generate some sample data */
    const n = 1000;
    for (let i = 0; i < n; i++) {
      this.rowData.push(new Thing('<i>Thing</i> ' + i, 'No Edit <b>' + i + '</b>', i - n / 2, i / 29, i / 29, 0, false));
    }

    /* Create column definitions */
    const column1 = new Column('Label', 'label');

    const column2 = new Column('No Edit', 'noedit');
    column2.editable = false;

    const column3 = new Column('Integer', 'integer');
    column3.formatter = new IntegerFormatter();
    column3.editor = new LinkedEditor();

    const column4 = new Column('Float', 'float');
    column4.formatter = new DigitsOfPrecisionFormatter(2);

    const column5 = new Column('Percent', 'percent');
    column5.formatter = new PercentFormatter(2);

    const column6 = new Column('Options', 'option');
    column6.formatter = new ThingSelectionFormatter();
    column6.input = SelectionInputComponent;

    const column7 = new Column('Boolean', 'boolean');
    column7.formatter = new BooleanFormatter();
    column7.input = BooleanInputComponent;

    this.columns.push(column1);
    this.columns.push(column2);
    this.columns.push(column3);
    this.columns.push(column4);
    this.columns.push(column5);
    this.columns.push(column6);
    this.columns.push(column7);
  }

  change(rce: RowChangedEvent) {
    // Usually a Store of some sort or an API call would be made here.
    // For demo we simply replace original with clone.
    Object.assign(rce.row, rce.clonedRow);

    // Kick off ng changes
    this.rowData = [...this.rowData];
  }

  delete(row: Thing) {
    const i = this.rowData.indexOf(row);
    this.rowData.splice(i, 1);

    // Kick off ng changes
    this.rowData = [...this.rowData];
  }

  add(row: Thing) {
    this.rowData.push(row);
    this.rowData = [...this.rowData];
  }

  click(row: Thing) {
    console.log(row);
  }
}

class Thing {
  constructor(public label: string,
              public noedit: string,
              public integer: number,
              public float: number,
              public percent: number,
              public option: number,
              public boolean: boolean) {
  }
}

class LinkedEditor implements Editor {
  edit(row: Thing, column: Column, value: any) {
    row[column.accessor] = value;
    row.noedit = 'No Edit: ' + value;
  }
}

class ThingSelectionFormatter extends SelectionFormatter {
  constructor() {
    super();

    for (let i = 0; i < 5; i++) {
      this.selectionMap.put('Option ' + i, new SelectorItem('Tooltip for option ' + i, i));
    }
  }
}
