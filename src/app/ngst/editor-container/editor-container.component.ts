import {
  Component, ComponentFactoryResolver, EventEmitter, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import {PolymorphicContainerDirective} from '../directives/polymorphic-container.directive';
import {Column} from '../table/ngst-model';
import {EditorComponent} from '../editor/editor.component';

@Component({
  selector: 'ngst-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.css']
})
export class EditorContainerComponent implements OnInit, OnChanges {
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
    const factory = this.resolver.resolveComponentFactory(this.column.editor);

    const containerRef = this.polymorphicContainer.viewContainerRef;
    containerRef.clear();

    const component = containerRef.createComponent(factory);
    (<EditorComponent>component.instance).init(this.item, this.column, this.showPlaceholder, this.fullWidth, this.changedEmitter);
  }
}
