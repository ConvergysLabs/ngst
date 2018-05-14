import {
  Component, ComponentFactoryResolver, EventEmitter, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import {PolymorphicContainerDirective} from '../../directives/polymorphic-container.directive';
import {Column} from '../../table/ngst-model';
import {RawInputComponent} from '../raw-input/raw-input.component';

@Component({
  selector: 'ngst-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit, OnChanges {
  @ViewChild(PolymorphicContainerDirective) polymorphicContainer: PolymorphicContainerDirective;
  @Input() column: Column;
  @Input() item: any;
  @Input() showPlaceholder: boolean;
  @Input() fullWidth: boolean;
  @Output() changedEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // We use polymorphism to ask the column editor to render itself
    const factory = this.resolver.resolveComponentFactory(this.column.input);

    const containerRef = this.polymorphicContainer.viewContainerRef;
    containerRef.clear();

    const component = containerRef.createComponent(factory);
    (<RawInputComponent>component.instance).init(this.item, this.column, this.showPlaceholder, this.fullWidth, this.changedEmitter);
  }
}
