import {Type} from '@angular/core';
import {RawInputComponent} from '../inputs/raw-input/raw-input.component';

export class Column {
  public formatter: Formatter = new StringFormatter();
  public editor: Editor = new StringEditor();
  public validator: Validator = new DefaultValidator();
  public input: Type<{}> = RawInputComponent;
  public required: boolean = false;
  public editable: boolean = true;
  public customComponent: any;
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

export class SelectionFormatter implements Formatter {
  public selectionMap: SelectionMap = new SelectionMap();

  format(rowData: any, column: Column): string {
    return this.selectionMap.aliasOf(column.getRowValue(rowData));
  }

  parse(value: string): string | number {
    return value;
  }
}

export class BooleanFormatter implements Formatter {
  format(rowData: any, column: Column): string {
    return column.getRowValue(rowData) ? 'True' : 'False';
  }

  parse(value: string): string | number {
    return value;
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

export interface Validator {
  validate(row: any, column: Column, value: any);
}

export class DefaultValidator implements Validator {
  validate(row: any, column: Column, value: any) {
    return true;
  }
}


export class SelectorItem {
  constructor(public description: string, public value: string | number) {

  }
}

export class SelectionMap {
  private map: { [alias: string]: SelectorItem } = {};

  public put(alias: string, item: SelectorItem) {
    this.map[alias] = item;
  }

  public options(): string[] {
    return Object.keys(this.map);
  }

  public valueOf(alias: string) {
    return this.map[alias].value;
  }

  public descriptionOf(alias: string) {
    return this.map[alias].description;
  }

  public aliasOf(value: string) {
    for (const alias of this.options()) {
      if (this.map[alias].value === value) {
        return alias;
      }
    }

    return value;
  }
}

export class Action {
  constructor(public name: string,
              public icon: string,
              public tooltip: string = null
              ) {
  }
}

