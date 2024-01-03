import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomepageComponent } from './new-homepage.component';

describe('NewHomepageComponent', () => {
  let component: NewHomepageComponent;
  let fixture: ComponentFixture<NewHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
