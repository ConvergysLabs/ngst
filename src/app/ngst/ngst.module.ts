import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {PolymorphicContainerDirective} from './directives/polymorphic-container.directive';
import {RawInputComponent} from './inputs/raw-input/raw-input.component';
import {InputContainerComponent} from './inputs/input-container/input-container.component';
import {FormsModule} from '@angular/forms';
import {NewRowDialogComponent} from './new-row-dialog/new-row-dialog.component';
import {StopPropogationDirective} from './directives/stop-propogation.directive';
import {SelectionInputComponent} from './inputs/selection-input/selection-input.component';

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
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [
    TableComponent,
    PolymorphicContainerDirective,
    RawInputComponent,
    SelectionInputComponent,
    InputContainerComponent,
    NewRowDialogComponent,
    StopPropogationDirective
  ],
  exports: [
    TableComponent,
    RawInputComponent
  ],
  entryComponents: [
    RawInputComponent,
    SelectionInputComponent,
    NewRowDialogComponent
  ]
})
export class NgstModule {
}
