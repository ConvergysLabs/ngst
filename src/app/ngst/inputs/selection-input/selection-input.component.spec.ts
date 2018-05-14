import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInputComponent } from './selection-input.component';

describe('SelectionInputComponent', () => {
  let component: SelectionInputComponent;
  let fixture: ComponentFixture<SelectionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
