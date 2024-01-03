import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { AppComponent } from './app.component';
import { NotifyService } from './services/notify.service';
import { CategoryService } from './services/category.service';
import { RegisterService } from './services/register.service';
import { AnswerService } from './services/answer.service';
import { QuestionService } from './services/question.service';
import { ResultService } from './services/result.service';
import { HohService } from './services/hoh.service';
import { InviteService } from './services/invite.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule ,
        
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        NotifyService,
        CategoryService,
        RegisterService,
        AnswerService,
        QuestionService,
        ResultService,
        HohService,
        InviteService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'family-id'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('family-id');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('family-id app is running!');
  });
});
