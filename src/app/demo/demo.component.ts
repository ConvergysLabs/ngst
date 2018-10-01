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

  firstClicked() {
    console.log(this.data.first);
  }

  secondClicked() {
    console.log(this.data.second);
  }
}
