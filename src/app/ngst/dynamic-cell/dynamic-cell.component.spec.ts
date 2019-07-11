import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCellComponent } from './dynamic-cell.component';
import {ComponentFactoryResolver, NO_ERRORS_SCHEMA} from '@angular/core';
import {PolymorphicContainerDirective} from "../directives/polymorphic-container.directive";

import {DemoComponent} from "../../demo/demo.component";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";


describe('DynamicCellComponent', () => {
  let component: DynamicCellComponent;
  let fixture: ComponentFixture<DynamicCellComponent>;
  let componentFactoryResolver : ComponentFactoryResolver;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCellComponent, DemoComponent, PolymorphicContainerDirective],
      schemas : [NO_ERRORS_SCHEMA]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DemoComponent]
      }
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCellComponent);
    component = fixture.componentInstance;
    component.component = DemoComponent;
    componentFactoryResolver =  fixture.debugElement.injector.get(ComponentFactoryResolver);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 