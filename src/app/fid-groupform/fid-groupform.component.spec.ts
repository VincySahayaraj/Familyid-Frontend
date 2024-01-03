import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidGroupformComponent } from './fid-groupform.component';

describe('FidGroupformComponent', () => {
  let component: FidGroupformComponent;
  let fixture: ComponentFixture<FidGroupformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidGroupformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidGroupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
