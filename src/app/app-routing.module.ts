import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AnswerStartedComponent } from './answer-started/answer-started.component';
import {FidQuestion1Component} from './fid-question1/fid-question1.component';
import {FidFormComponent} from './fid-form/fid-form.component';
import {ResultSectionComponent} from './result-section/result-section.component';
import {FidGroupformComponent} from './fid-groupform/fid-groupform.component';
import { ConfirmationpageComponent } from './confirmationpage/confirmationpage.component';
import { AuthGuard } from './shared/auth.guard';
import { ResultLinkComponent } from './result-link/result-link.component';
import { FamilyresultpageComponent } from './familyresultpage/familyresultpage.component';
import { NewHomepageComponent } from './new-homepage/new-homepage.component';

const routes: Routes = [

  // { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  // { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: NewHomepageComponent },
  { path: 'answerpage', component: AnswerStartedComponent, canActivate: [AuthGuard] },
  { path: 'fidquestionpage', component: FidQuestion1Component, canActivate: [AuthGuard] },
  { path: 'fidformpage', component:FidFormComponent , canActivate: [AuthGuard] },
  { path: 'resultpage', component:ResultSectionComponent , canActivate: [AuthGuard] },
  { path: 'familyresult', component:FamilyresultpageComponent },
  { path: 'familyinvitepage', component:FidGroupformComponent },
  { path: 'confirmationpage', component: ConfirmationpageComponent },
  { path: 'mailresult', component: ResultLinkComponent},

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomepageComponent },
  // { path: 'agegroup', component: AnswerStartedComponent, canActivate: [AuthGuard] },
  // { path: 'assessment', component: FidQuestion1Component, canActivate: [AuthGuard] },
  // { path: 'registrationform', component:FidFormComponent , canActivate: [AuthGuard] },
  // { path: 'result', component:ResultSectionComponent , canActivate: [AuthGuard] },
  // { path: 'familyresult', component:FamilyresultpageComponent },
  // { path: 'invitationform', component:FidGroupformComponent },
  // { path: 'successfulinvitation', component: ConfirmationpageComponent },
  // { path: 'mailresult', component: ResultLinkComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


