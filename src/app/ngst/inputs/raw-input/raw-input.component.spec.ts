import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawInputComponent } from './raw-input.component';

describe('RawInputComponent', () => {
  let component: RawInputComponent;
  let fixture: ComponentFixture<RawInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
