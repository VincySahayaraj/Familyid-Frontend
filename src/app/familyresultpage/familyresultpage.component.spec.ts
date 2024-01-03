import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyresultpageComponent } from './familyresultpage.component';

describe('FamilyresultpageComponent', () => {
  let component: FamilyresultpageComponent;
  let fixture: ComponentFixture<FamilyresultpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyresultpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyresultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
