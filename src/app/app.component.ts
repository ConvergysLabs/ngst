import {Component} from '@angular/core';
import {
  BooleanFormatter,
  Column, DigitsOfPrecisionFormatter, Editor, IntegerFormatter, PercentFormatter,
  SelectionFormatter, SelectorItem, Action
} from './ngst/table/ngst-model';
import {RawInputComponent} from './ngst/inputs/raw-input/raw-input.component';
import {RowChangedEvent} from './ngst/table/table.component';
import {SelectionInputComponent} from './ngst/inputs/selection-input/selection-input.component';
import {BooleanInputComponent} from './ngst/inputs/boolean-input/boolean-input.component';
import {TextAreaInputComponent} from './ngst/inputs/raw-input/text-area-input.component';
import {DemoComponent} from './demo/demo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columns: Array<Column> = [];
  rowData: Array<Thing> = [];
  actions: Array<Action> = [];

  constructor() {
    // Set Actions Column

    const action1 = new Action('play', 'play_arrow', 'tooltip play');
    const action2 = new Action('configure', 'build', 'tooltip configure');
    const action3 = new Action('red', 'favorite');

    this.actions.push(action1);
    this.actions.push(action2);
    this.actions.push(action3);

    /* Generate some sample data */
    const n = 1000;
    for (let i = 0; i < n; i++) {
      this.rowData.push(
        new Thing('<i>Thing</i> ' + i,
          'No Edit <b>' + i + '</b>',
          i - n / 2,
          i / 29,
          i / 29,
          0,
          false,
          'Long text goes here!',
          {
            first: `first Data: ${i}`,
            second: `second Data: ${i - n / 2}`
          }));
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

    const column8 = new Column('Text Area', 'textarea');
    column8.input = TextAreaInputComponent;

    const column9 = new Column('Custom Component', 'customComponentData');
    column9.customComponent = DemoComponent;

    this.columns.push(column1);
    this.columns.push(column2);
    this.columns.push(column3);
    this.columns.push(column4);
    this.columns.push(column5);
    this.columns.push(column6);
    this.columns.push(column7);
    this.columns.push(column8);
    this.columns.push(column9);
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
    console.log('it works!');
  }

  play(row: Thing) {
    // WIP
    console.log('play row');
    return row;
  }

  add(row: Thing) {
    this.rowData.push(row);
    this.rowData = [...this.rowData];
  }

  click(row: Thing) {
    console.log(row);
  }

  action(action: any) {
    console.log(action);
  }
}

class Thing {
  constructor(public label: string,
              public noedit: string,
              public integer: number,
              public float: number,
              public percent: number,
              public option: number,
              public boolean: boolean,
              public textarea: string,
              public customComponentData: any) {
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
