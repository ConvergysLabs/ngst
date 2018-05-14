import {Component} from '@angular/core';
import {Column, DigitsOfPrecisionFormatter, Editor, IntegerFormatter, PercentFormatter} from './ngst/table/ngst-model';
import {StringInputComponent} from './ngst/inputs/string-input/string-input.component';
import {RowChangedEvent} from './ngst/table/table.component';

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
    for (let i = 0; i < 1000; i++) {
      this.rowData.push(new Thing('Thing ' + i, 'No Edit ' + i, i, i / 29, i / 29));
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

    this.columns.push(column1);
    this.columns.push(column2);
    this.columns.push(column3);
    this.columns.push(column4);
    this.columns.push(column5);
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
              public percent: number) {
  }
}

class LinkedEditor implements Editor {
  edit(row: Thing, column: Column, value: any) {
    row[column.accessor] = value;
    row.noedit = 'No Edit: ' + value;
  }
}
