import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveComplaintPage } from './resolve-complaint.page';

describe('ResolveComplaintPage', () => {
  let component: ResolveComplaintPage;
  let fixture: ComponentFixture<ResolveComplaintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveComplaintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
