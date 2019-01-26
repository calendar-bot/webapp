import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategroupsuccessComponent } from './creategroupsuccess.component';

describe('CreategroupsuccessComponent', () => {
  let component: CreategroupsuccessComponent;
  let fixture: ComponentFixture<CreategroupsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategroupsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategroupsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
