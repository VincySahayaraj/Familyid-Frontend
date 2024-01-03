import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { AnswerStartedComponent } from './answer-started/answer-started.component';
import { FidQuestion1Component } from './fid-question1/fid-question1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FidFormComponent } from './fid-form/fid-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResultSectionComponent } from './result-section/result-section.component';
import { FidGroupformComponent } from './fid-groupform/fid-groupform.component';
import { ConfirmationpageComponent } from './confirmationpage/confirmationpage.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressbarModule, ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ResultLinkComponent } from './result-link/result-link.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FamilyresultpageComponent } from './familyresultpage/familyresultpage.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import { NewHomepageComponent } from './new-homepage/new-homepage.component'

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        HeaderComponent,
        AnswerStartedComponent,
        FidQuestion1Component,
        FidFormComponent,
        ResultSectionComponent,
        FidGroupformComponent,
        ConfirmationpageComponent,
        ResultLinkComponent,
        FamilyresultpageComponent,
        NewHomepageComponent,
      
    ],
    entryComponents: [],
    providers: [NgbActiveModal, HomepageComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        Ng5SliderModule,
        NgbModule,
        MdbAccordionModule,
        MatTabsModule,
        ProgressbarModule,
        MatSliderModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
    
    ]
})
export class AppModule { }
