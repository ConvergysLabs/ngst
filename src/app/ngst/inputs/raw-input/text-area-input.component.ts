import {Component, EventEmitter} from '@angular/core';
import {Column} from '../../table/ngst-model';
import {RawInputComponent} from './raw-input.component';

@Component({
  selector: 'ngst-text-area-input',
  templateUrl: './raw-input.component.html',
  styleUrls: ['./raw-input.component.css']
})
export class TextAreaInputComponent extends RawInputComponent {
  type = this.TYPE_TEXT_AREA;
}
