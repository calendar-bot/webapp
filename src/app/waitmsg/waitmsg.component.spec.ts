import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitmsgComponent } from './waitmsg.component';

describe('WaitmsgComponent', () => {
  let component: WaitmsgComponent;
  let fixture: ComponentFixture<WaitmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
