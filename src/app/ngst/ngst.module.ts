import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {
  MatButtonModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {PolymorphicContainerDirective} from './directives/polymorphic-container.directive';
import {StringInputComponent} from './inputs/string-input/string-input.component';
import {InputContainerComponent} from './inputs/input-container/input-container.component';
import {FormsModule} from '@angular/forms';
import {NewRowDialogComponent} from './new-row-dialog/new-row-dialog.component';
import {StopPropogationDirective} from './directives/stop-propogation.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [
    TableComponent,
    PolymorphicContainerDirective,
    StringInputComponent,
    InputContainerComponent,
    NewRowDialogComponent,
    StopPropogationDirective
  ],
  exports: [
    TableComponent,
    StringInputComponent
  ],
  entryComponents: [
    StringInputComponent,
    NewRowDialogComponent
  ]
})
export class NgstModule {
}
