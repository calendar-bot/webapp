import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewparticipantComponent } from './newparticipant.component';

describe('NewparticipantComponent', () => {
  let component: NewparticipantComponent;
  let fixture: ComponentFixture<NewparticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewparticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
