import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngst-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    console.log(this.data);
  }
}
