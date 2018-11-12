import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateselectComponent } from './dateselect.component';

describe('DateselectComponent', () => {
  let component: DateselectComponent;
  let fixture: ComponentFixture<DateselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
