import {Component, EventEmitter, OnInit} from '@angular/core';
import {Column} from '../table/ngst-model';

@Component({
  selector: 'ngst-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  protected item: any;
  protected column: Column;
  protected showPlaceholder: boolean = false;
  protected fullWidth: boolean = false;
  protected value: any;
  protected changedEmitter: EventEmitter<any>;

  constructor() {
  }

  init(item: any, column: Column, showPlaceholder: boolean, fullWidth: boolean, changedEmitter: EventEmitter<any>) {
    this.item = item;
    this.column = column;
    this.showPlaceholder = showPlaceholder;
    this.fullWidth = fullWidth;
    this.changedEmitter = changedEmitter;

    this.value = this.item[this.column.accessor];
  }

  ngOnInit() {
  }

  changed() {
    this.changedEmitter.emit(this.value);
  }
}
