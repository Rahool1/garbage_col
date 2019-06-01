import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComplaintPage } from './new-complaint.page';

describe('NewComplaintPage', () => {
  let component: NewComplaintPage;
  let fixture: ComponentFixture<NewComplaintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComplaintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
