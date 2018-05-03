import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRowDialogComponent } from './new-row-dialog.component';

describe('NewRowDialogComponent', () => {
  let component: NewRowDialogComponent;
  let fixture: ComponentFixture<NewRowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
