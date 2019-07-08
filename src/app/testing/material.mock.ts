import {Component, Injectable, NgModule} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {MatSelectModule, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar, MatDialog } from '@angular/material';

export class MockMatDialogRef {

  close(dialogResult?: any) {

  }

  afterClosed() {
    return of(null)
  }
}

@Injectable()
export class MockMatDialogData {
  public map() {

  }
}


@Injectable()
export class MockMatDialog {
  public map() {

  }
}

export class MockSnackBar {
  open(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return null;
  }
}

export class MockDialog {
  results: BehaviorSubject<any> = new BehaviorSubject({});

  open() {
    return {
      afterClosed: () => of(this.results)
    };
  }
}



// Mock for MatSelectModule
@Component({
  selector: 'mat-select',
  template: '<p>Mock for matSelect</p>'
})
export class MatSelect {
  close() {
  }

  focus() {
  }
}

@NgModule({
  declarations: [
    MatSelect
  ]
})

export class MockMatSelectModule {
}
