import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsuccessComponent } from './contactsuccess.component';

describe('ContactsuccessComponent', () => {
  let component: ContactsuccessComponent;
  let fixture: ComponentFixture<ContactsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
