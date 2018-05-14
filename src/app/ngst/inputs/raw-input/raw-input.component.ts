import {Component, EventEmitter} from '@angular/core';
import {Column} from '../../table/ngst-model';

@Component({
  selector: 'ngst-raw-input',
  templateUrl: './raw-input.component.html',
  styleUrls: ['./raw-input.component.css']
})
export class RawInputComponent {
  public item: any;
  public column: Column;
  public showPlaceholder: boolean = false;
  public fullWidth: boolean = false;
  public value: any;
  public changedEmitter: EventEmitter<any>;

  init(item: any, column: Column, showPlaceholder: boolean, fullWidth: boolean, changedEmitter: EventEmitter<any>) {
    this.item = item;
    this.column = column;
    this.showPlaceholder = showPlaceholder;
    this.fullWidth = fullWidth;
    this.changedEmitter = changedEmitter;

    this.value = this.item[this.column.accessor];
  }

  changed() {
    this.changedEmitter.emit(this.column.formatter.parse(this.value));
  }
}
