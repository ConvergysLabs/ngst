import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[ngstStopPropogation]'
})
export class StopPropogationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}
