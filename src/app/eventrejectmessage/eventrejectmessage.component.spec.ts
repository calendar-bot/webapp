import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventrejectmessageComponent } from './eventrejectmessage.component';

describe('EventrejectmessageComponent', () => {
  let component: EventrejectmessageComponent;
  let fixture: ComponentFixture<EventrejectmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventrejectmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventrejectmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
