import {Component} from '@angular/core';
import {Column, DigitsOfPrecisionFormatter, IntegerFormatter, PercentFormatter} from './ngst/table/ngst-model';
import {EditorComponent} from './ngst/editor/editor.component';
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
    // Generate some sample data
    for (let i = 0; i < 1000; i++) {
      this.rowData.push(new Thing('Thing ' + i, 'No Edit ' + i, i, i / 29, i / 29));
    }

    const column1 = new Column('Label', 'label');
    column1.editor = EditorComponent;

    const column2 = new Column('No Edit', 'noedit');

    const column3 = new Column('Integer', 'integer');
    column3.editor = EditorComponent;
    column3.formatter = new IntegerFormatter();

    const column4 = new Column('Float', 'float');
    column4.editor = EditorComponent;
    column4.formatter = new DigitsOfPrecisionFormatter(2);

    const column5 = new Column('Percent', 'percent');
    column5.editor = EditorComponent;
    column5.formatter = new PercentFormatter(2);

    this.columns.push(column1);
    this.columns.push(column2);
    this.columns.push(column3);
    this.columns.push(column4);
    this.columns.push(column5);
  }

  change(rce: RowChangedEvent) {
    // Usually a Store of some sort or an API call would be made here.
    rce.row[rce.column.accessor] = rce.newValue;

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
