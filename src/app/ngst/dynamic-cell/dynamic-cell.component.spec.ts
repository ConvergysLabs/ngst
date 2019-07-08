import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCellComponent } from './dynamic-cell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {ComponentFactoryResolver } from '@angular/core';
import {PolymorphicContainerDirective} from '../directives/polymorphic-container.directive';
import {Directive} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Directive({
  selector: '[ngstPolymorphicContainer]'
})
export class MockPolymorphicContainerDirective {
}


describe('DynamicCellComponent', () => {
  let component: DynamicCellComponent;
  let fixture: ComponentFixture<DynamicCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCellComponent, MockPolymorphicContainerDirective],
      providers: [ComponentFactoryResolver],
      imports: [HttpClientModule],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
