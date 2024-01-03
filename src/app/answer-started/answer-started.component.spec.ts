import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerStartedComponent } from './answer-started.component';

describe('AnswerStartedComponent', () => {
  let component: AnswerStartedComponent;
  let fixture: ComponentFixture<AnswerStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerStartedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
