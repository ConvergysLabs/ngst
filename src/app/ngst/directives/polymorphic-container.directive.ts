import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngstPolymorphicContainer]'
})
export class PolymorphicContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
