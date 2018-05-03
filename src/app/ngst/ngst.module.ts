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
import {EditorComponent} from './editor/editor.component';
import {EditorContainerComponent} from './editor-container/editor-container.component';
import {FormsModule} from '@angular/forms';
import {NewRowDialogComponent} from './new-row-dialog/new-row-dialog.component';

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
    EditorComponent,
    EditorContainerComponent,
    NewRowDialogComponent
  ],
  exports: [
    TableComponent
  ],
  entryComponents: [
    EditorComponent,
    NewRowDialogComponent
  ]
})
export class NgstModule {
}
