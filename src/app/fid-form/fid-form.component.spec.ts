import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidFormComponent } from './fid-form.component';

describe('FidFormComponent', () => {
  let component: FidFormComponent;
  let fixture: ComponentFixture<FidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
