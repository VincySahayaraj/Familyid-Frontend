import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidQuestion1Component } from './fid-question1.component';

describe('FidQuestion1Component', () => {
  let component: FidQuestion1Component;
  let fixture: ComponentFixture<FidQuestion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidQuestion1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidQuestion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
