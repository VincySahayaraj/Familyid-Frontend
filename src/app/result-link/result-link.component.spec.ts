import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLinkComponent } from './result-link.component';

describe('ResultLinkComponent', () => {
  let component: ResultLinkComponent;
  let fixture: ComponentFixture<ResultLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
