import {Type} from '@angular/core';

export class Column {
  public formatter: Formatter = new StringFormatter();
  public editor?: Type<{}>;

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
}

export class StringFormatter implements Formatter {
  format(rowData: any, column: Column): string {
    return column.getRowValue(rowData);
  }
}

export class DigitsOfPrecisionFormatter implements Formatter {
  constructor(public precision: number) {
  }

  format(rowData: any, column: Column): string {
    return column.getRowValue(rowData).toFixed(this.precision);
  }
}

export class PercentFormatter extends DigitsOfPrecisionFormatter {
  format(rowData: any, column: Column): string {
    return (column.getRowValue(rowData) * 100).toFixed(this.precision) + '%';
  }
}
