import {Type} from '@angular/core';
import {StringInputComponent} from '../inputs/string-input/string-input.component';

export class Column {
  public formatter: Formatter = new StringFormatter();
  public editor: Editor = new StringEditor();
  public input: Type<{}> = StringInputComponent;
  public editable: boolean = true;

  constructor(public label: string,
              public accessor: string) {
  }

  getRowValue(rowData: any): any {
    return rowData[this.accessor];
  }

  formatValue(rowData: any): string {
    return this.formatter.format(rowData, this);
  }
}

export interface Formatter {
  format(rowData: any, column: Column): string;

  parse(value: string): string | number;
}

export class StringFormatter implements Formatter {
  format(rowData: any, column: Column): string {
    return column.getRowValue(rowData);
  }

  parse(value: string): string | number {
    return value;
  }
}

export class IntegerFormatter implements Formatter {

  format(rowData: any, column: Column): string {
    return column.getRowValue(rowData).toFixed(0);
  }

  parse(value: string): string | number {
    const i = parseInt(value, 10);
    if (isNaN(i)) {
      return null;
    }
    return i;
  }
}

export class DigitsOfPrecisionFormatter implements Formatter {
  constructor(public precision: number) {
  }

  format(rowData: any, column: Column): string {
    return column.getRowValue(rowData).toFixed(this.precision);
  }

  parse(value: string): string | number {
    const f = parseFloat(value);
    if (isNaN(f)) {
      return null;
    }
    return f;
  }
}

export class PercentFormatter extends DigitsOfPrecisionFormatter {
  format(rowData: any, column: Column): string {
    return (column.getRowValue(rowData) * 100).toFixed(this.precision) + '%';
  }

  parse(value: string): string | number {
    const f = parseFloat(value);
    if (isNaN(f)) {
      return null;
    }
    return f;
  }
}

export interface Editor {
  edit(row: any, column: Column, value: any);
}

export class StringEditor implements Editor {
  edit(row: any, column: Column, value: any) {
    row[column.accessor] = value;
  }
}
