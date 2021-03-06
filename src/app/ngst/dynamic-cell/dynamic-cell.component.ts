import {Component, ComponentFactoryResolver, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PolymorphicContainerDirective} from '../directives/polymorphic-container.directive';
import {CustomComponent} from './customComponent';
import {optimizeGroupPlayer} from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'ngst-dynamic-cell',
  templateUrl: './dynamic-cell.component.html',
  styleUrls: ['./dynamic-cell.component.css']
})
export class DynamicCellComponent implements OnInit, OnChanges {

  @Input() component;
  @Input() data;

  componentRef;

  @ViewChild(PolymorphicContainerDirective) polymorphicContainerDirective: PolymorphicContainerDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges() {
    if (this.componentRef) {
      (<CustomComponent>this.componentRef.instance).data = this.data;
    }
  }

  loadComponent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.polymorphicContainerDirective.viewContainerRef;

    this.componentRef = viewContainerRef.createComponent(componentFactory);

    (<CustomComponent>this.componentRef.instance).data = this.data;

  }



}
