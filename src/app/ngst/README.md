# NgST

Pronounced "angst",  the "Angular SOMETHING Table" (name to change when we think of something clever for the "S" - we just liked the name ;p) aims to be a data table which leverages [Angular Material's Data Table components](https://material.angular.io/components/table/overview) while providing a more feature rich data table.

Additionally, NgST has the goal of not requiring the developer to perform data transformations on their data in order to render it. Instead, the developer defines `Column` definitions which consist of `Formatters` and `Editors` which tells the table how to render and inline edit their data.

NgST is currently in the very early stages of development, and better documentation is to come.

#### Current feature set
* Simple item creation and deletion
* Inline item edits
* Item click detection

#### Immediately planned features
* Item filters 


## Including NgST in your application

Add the dependency in your `package.json`
```json
"dependencies": {
  ...,
  "ngst": "1.2.3", <--be sure to use a real version number
  ...
}
```

Then either `npm install` or `yarn`.

## Example usage
Consider you are a developer that has a `List<Thing>` where `Thing` is your own structure and may look something like this:
```typescript
class Thing {
  constructor(public label: string,
              public noedit: string,
              public integer: number,
              public float: number,
              public percent: number) {
  }
}
```

To use NgST to both render and interact with your data you will need to provide `Column` definitions:

```typescript
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
``` 

Then in your template you would do the following:
```html
<ngst-table title="My Table"
            [columns]="columns"
            [rowData]="rowData"
            [canDelete]="true"
            [canCreate]="true"
            [canEdit]="true"
            [canClick]="true"
            (rowChanged)="change($event)"
            (rowDeleted)="delete($event)"
            (rowAdded)="add($event)"
            (rowClicked)="click($event)">
</ngst-table>
```

## Notes

#### Formatters
NgST ships out of the box with some basic `Formatters`:
* `StringFormatter`
* `IntegerFormatter`
* `DigitsOfPrecisionFormatter`
* `PercentFormatter`
* ...etc

More formatters may be provided in the future, however, you can implement your own simply by implementing the provided `Formatter` interface:

```typescript
export interface Formatter {
  format(rowData: any, column: Column): string;

  parse(value: string): string | number;
}
```

For example:

```typescript
export class MyCoolFormatter implements Formatter {
  format(rowData: any, column: Column): string {
    const myData = column.getRowValue(rowData); // The actual structure or object in your row data at the column specified
    
    return myCoolTransformation(myData);
  }

  parse(value: string): string | number {
    return convertToMyDataType(value);
  }
}
```

To further illustrate the example, this is what the `DigitsOfPrecisionFormatter` looks like:
```typescript
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
```

#### Editors
NgST uses polymorphism to dynamically render any widget/component for inline edits and item creation. Currently only one `Editor` is provided:
* `EditorComponent` - A simple `string`

However you can write your own `Editor` component and provide it to your `Column` definition provided your app module declares your `Editor` in `entryComponents`. Better documentation here, soon :/

NgST plans to provide the following editors out of the box, soon:
* `SelectionEditorComponent` - for using a selection from options instead of a string input during inline edits
* `CheckboxEditorComponent` - for using a checkbox instead of a string input during inline edits
