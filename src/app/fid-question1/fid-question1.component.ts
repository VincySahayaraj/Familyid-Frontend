import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { NotifyService } from '../services/notify.service';
import { ResultService } from '../services/result.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fid-question1',
  templateUrl: './fid-question1.component.html',
  styleUrls: ['./fid-question1.component.css']
})
export class FidQuestion1Component implements OnInit {

  answerIndex: any = 0;
  visitorid: any;
  singleObj: any;
  index: number = 0;
  age: any;
  AllListQuestions: any = '';
  id: any;
  attemptID: any;
  listquestion: any;
  totalquestionlist: any;
  totalCurrentQuestion: any = 1;
  isAttempt: any;
  scoreCard: any = false;
  categoryListing: any;
  isReturn: any = false;
  newattempt: any;
  typeSelected: any;
  showTotal: boolean = false;
  expandQuestion: boolean = false;
  animationadding: boolean = false;
  loaderAdded: boolean = false;
  buttonDisabled: boolean = true;
  buttonDisablednext: boolean = true;
  submitted = false;
  singleProgressBar: any = 0;

  allQuestion: any[] = Array();
  progressBar: any[] = Array();

  @Output('ngModelChange') update = new EventEmitter();

  @Input() answersArray: any[] = Array();
  @Input() categoryIndex: number = 0;
  @Input() headingcat: any;
  @Input() category: any;
  @Input() questions: any;
  @Input() totalQuestions: any;
  @Input() totalCategories: any;
  @Input() currentQuestions: any;

  constructor(
    public questionservice: QuestionService,
    private answerservice: AnswerService,
    private notifyservice: NotifyService,
    private resultservice: ResultService,
    private spinnerService: NgxSpinnerService,
    private router: Router) {

    this.typeSelected = 'ball-fussion';
    this.age = localStorage.getItem('age');
    this.visitorid = localStorage.getItem('visitorid');
    this.attemptID = localStorage.getItem('attemptID');
    this.isAttempt = localStorage.getItem('isAttempt');
    this.isReturn = localStorage.getItem('isReturn');

  }

  // Click to expand question
  clickLoadMore() {
    this.expandQuestion = !this.expandQuestion;
  }

  ngOnInit() {
    this.getAllAgeBasedQuestion();
  }

  //Get all questions based on heading
  getQuestionforUser() {

    this.spinnerService.show("mySpinner");
    this.questionservice.getQuestionlistbyage(this.age).subscribe((response) => {
      this.spinnerService.hide("mySpinner");
      this.AllListQuestions = response;
      this.AllListQuestions = JSON.parse(this.AllListQuestions.result)
      this.appendQuestions();

    })
  }

  //Append the questions based on category
  appendQuestions() {

    this.allQuestion = []
    this.AllListQuestions.forEach((element: any) => {

      //Differentiate Questions based on category
      if (element.Categoryincluded == this.headingcat) {
        this.allQuestion.push(element);
      }
    })

    this.totalQuestions = this.allQuestion.length;
    this.currentQuestions = 1;
    this.questions = this.allQuestion[this.index].Question;

    // disable the previous button for first Question
    if (this.index <= 0 && this.categoryIndex <= 0 && this.totalCurrentQuestion == 1) {
      this.buttonDisabled = true;
    }
    else {
      this.buttonDisabled = false;
    }
  }

  //get count for question and category
  getAllAgeBasedQuestion() {

    this.spinnerService.show('mySpinner');
    this.questionservice.getAgeBasedQuestions(this.age).subscribe((response) => {

      this.listquestion = response;
      this.categoryListing = JSON.parse(this.listquestion.result);
      this.totalquestionlist = this.categoryListing.questionTotal;
      this.spinnerService.hide("mySpinner");
      this.showTotal=true;
      this.category = this.categoryListing.CategoryQuestionCountsByAge;
      this.category.forEach((element: any) => {
        this.progressBar.push(0);
      })

      this.totalCategories = this.categoryListing.CategoryQuestionCountsByAge.length;

      // Categories List
      this.headingcat = this.category[this.categoryIndex].categoryname;
      if (this.index != -1) {
        this.getQuestionforUser();
      }
    })
  }

  answer = {

    category: '',
    score: ''

  };

  form = new FormGroup({
    score: new FormControl('', [Validators.required])
  })

  get f() {
    return this.form.controls

  }

  // Move next question in single answer click
  newnextQuestion(agegroup: any, attemptID: any, visitorid: any, answer: any, question: any, returnScoreCard: any, questioncount: any, val: any) {

    // Previous button disabled in first question
    if (this.index <= 0 && this.categoryIndex <= 0 && this.totalCurrentQuestion == 1) {
      this.buttonDisabled = false;
    }
    else {
    }

    this.answer.category = this.headingcat;
    this.answersArray[this.answerIndex] = answer.score;
    this.index = this.index + 1;
    this.loaderAdded = !this.loaderAdded;
    this.totalCurrentQuestion = this.totalCurrentQuestion + 1;
    var i = 0, progressIndex = 0;

    //Category name based on questions
    this.category.forEach((element: any) => {
      if (element.categoryname == this.headingcat) {
        progressIndex = i;
      }
      i++;
    });


    // single progress bar
    this.singleProgressBar = this.singleProgressBar + 100 / this.totalquestionlist;

    //Progress bar
    this.progressBar[progressIndex] = this.progressBar[progressIndex] + 100 / this.totalQuestions;

    //Move to the next question
    setTimeout(() => {
      this.spinnerService.hide()
    }, 1000)

    //move to next question
    this.currentQuestions = this.currentQuestions + 1;
    this.spinnerService.show();

    //check the condition of current question is less the total question
    if (this.currentQuestions <= this.allQuestion.length) {

      this.questions = this.allQuestion[this.index].Question;
      this.animationadding = !this.animationadding;
      this.answerIndex = this.answerIndex + 1;

    }
    else if (this.categoryIndex == this.totalCategories - 1 && this.currentQuestions == this.allQuestion.length + 1) {

      //final question will remain as same as total question number
      this.totalCurrentQuestion = this.totalCurrentQuestion - 1;

      this.showToasterSuccess();

      //check if it is retake or first attempt
      if (this.isAttempt == 'false') {
        this.router.navigateByUrl('/fidformpage');
      }
      else {
        if (this.isAttempt == 'true') {

          if (this.isReturn == 'true') {

            //if it is retake and final question and make the returnscore card true
            returnScoreCard = true;
            answer.category = this.answer.category;

            answer = {

              category: this.answer.category,
              score: val//answer.score

            };

            this.singleObj = {
              visitorid,
              answer,
              question,
              attemptID,
              agegroup,
              returnScoreCard,
              //questioncount


            }
            this.spinnerService.show();
            //api call for direct result access for retake
            this.answerservice.answerSubmit(this.singleObj).subscribe((response) => {

              if (returnScoreCard == true) {

                this.newattempt = response;
                //stire this result in resultservice page
                this.resultservice.result = this.newattempt.result;
                this.resultservice.result = JSON.parse(this.resultservice.result);
                this.router.navigateByUrl('/resultpage');
                this.spinnerService.hide();

              }
              else {

              }
            })
          }
        }
        else {
          returnScoreCard = false;
        }
      }

    }

    //change to next category and append corresponding questions
    else {

      this.categoryIndex = this.categoryIndex + 1
      this.headingcat = this.category[this.categoryIndex].categoryname;
      this.index = 0;
      this.currentQuestions = this.currentQuestions - 1;
      this.answerIndex = this.answerIndex + 1;
      this.appendQuestions();

    }
    this.id = this.headingcat;

    answer.category = this.answer.category;
    answer = {

      category: this.answer.category,
      score: answer.score

    };

    this.singleObj = {
      visitorid,
      answer,
      question,
      attemptID,
      agegroup,
      returnScoreCard,
      //questioncount

    }

    if (returnScoreCard == false) {
      // answer submission
      this.answerservice.answerSubmit(this.singleObj).subscribe((response) => {

        //check if its is retake or not
        if (returnScoreCard == true) {

          this.newattempt = response;
          this.resultservice.result = this.newattempt.result;

        }
        else {
        }
      })
    }


    //Previous button click-show the choosed answer
    if (this.answersArray[this.answerIndex] != undefined) {

      setTimeout(() => {
        this.answer.score = this.answersArray[this.answerIndex];
      }, 0);
    }
    else {

      //reset the form for next question
      this.form.reset();
    }

    this.buttonDisablednext = true;
    if (this.answerIndex < this.answersArray.length) {
      this.buttonDisablednext = false;
    }
  }

  nextQuestion(agegroup: any, attemptID: any, visitorid: any, answer: any, question: any, returnScoreCard: any, questioncount: any) {

    this.submitted = false;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    if (this.index <= 0 && this.categoryIndex <= 0 && this.totalCurrentQuestion == 1) {
      this.buttonDisabled = false;
    }
    else {

    }

    this.answer.category = this.headingcat;
    this.answersArray[this.answerIndex] = answer.score;
    var scoring = answer.score;
    this.index = this.index + 1;
    this.totalCurrentQuestion = this.totalCurrentQuestion + 1;
    var i = 0, progressIndex = 0;

    //Category name based on questions
    this.category.forEach((element: any) => {

      if (element.categoryname == this.headingcat) {

        progressIndex = i;

      }
      i++;
    });

    // single progress bar
    this.singleProgressBar = this.singleProgressBar + 100 / this.totalquestionlist;

    //Progress bar
    this.progressBar[progressIndex] = this.progressBar[progressIndex] + 100 / this.totalQuestions;

    //Move to the next question
    this.currentQuestions = this.currentQuestions + 1;

    //check the condition of current question is less the total question
    if (this.currentQuestions <= this.allQuestion.length) {

      this.questions = this.allQuestion[this.index].Question;
      this.animationadding = !this.animationadding;
      this.answerIndex = this.answerIndex + 1;

    }
    else if (this.categoryIndex == this.totalCategories - 1 && this.currentQuestions == this.allQuestion.length + 1) {

      //final question will remain as same as total question number
      this.totalCurrentQuestion = this.totalCurrentQuestion - 1;
      this.showToasterSuccess();

      //check if it is retake or first attempt
      if (this.isAttempt == 'false') {
        this.router.navigateByUrl('/fidformpage');
      }
      else {
        if (this.isAttempt == 'true') {
          if (this.isReturn == 'true') {

            //if it is retake and final question and make the returnscore card true
            returnScoreCard = true;
            answer.category = this.answer.category;
            answer.score = scoring;
            answer = {
              category: this.answer.category,
              score: answer.score
            };

            //pass these inputs to api
            this.singleObj = {
              visitorid,
              answer,
              question,
              attemptID,
              agegroup,
              returnScoreCard,
              //questioncount
            }

            this.spinnerService.show();
            //api call for direct result access for retake
            this.answerservice.answerSubmit(this.singleObj).subscribe((response) => {

              if (returnScoreCard == true) {

                this.newattempt = response;

                //stire this result in resultservice page
                this.resultservice.result = this.newattempt.result;
                this.resultservice.result = JSON.parse(this.resultservice.result);
                this.router.navigateByUrl('/resultpage');
                this.spinnerService.hide();
              }
              else {

              }
            })
          }
        }
        else {
          returnScoreCard = false;
        }
      }
    }

    //change to next category and append corresponding questions
    else {
      this.categoryIndex = this.categoryIndex + 1
      this.headingcat = this.category[this.categoryIndex].categoryname;

      this.index = 0;
      this.currentQuestions = this.currentQuestions - 1;
      this.answerIndex = this.answerIndex + 1;
      this.appendQuestions();

    }
    this.id = this.headingcat;

    answer.category = this.answer.category;
    answer.score = scoring;

    answer = {

      category: this.answer.category,
      score: answer.score

    };

    this.singleObj = {
      visitorid,
      answer,
      question,
      attemptID,
      agegroup,
      returnScoreCard,
      //questioncount

    }

    this.answerservice.answerSubmit(this.singleObj).subscribe((response) => {
      if (returnScoreCard == true) {

        this.newattempt = response;
        this.resultservice.result = this.newattempt.result;

      }
      else {
      }
    })


    //Previous button click-show the choosed answer
    if (this.answersArray[this.answerIndex] != undefined) {
      this.answer.score = this.answersArray[this.answerIndex];
    }
    else {
      this.form.reset();
    }

    //enable next button
    this.buttonDisablednext = true;
    if (this.answerIndex < this.answersArray.length) {
      this.buttonDisablednext = false;
    }
  }


  //prev question function
  prevQuestion() {

    this.buttonDisabled = true;
    this.buttonDisablednext = false;

    this.answerIndex = this.answerIndex - 1;

    //check if its a first question or not
    if (this.totalCurrentQuestion != 1) {
      this.totalCurrentQuestion = this.totalCurrentQuestion - 1;
    }

    this.answer.score = this.answersArray[this.answerIndex];
    this.index = this.index - 1;

    //if the question number is more than 1
    if (this.index >= 0) {

      this.currentQuestions = this.currentQuestions - 1;
      this.questions = this.allQuestion[this.index].Question;
      this.animationadding = !this.animationadding;

    }

    //previous category
    else {
      this.categoryIndex = this.categoryIndex - 1;
      if (this.categoryIndex > 0) {
        this.headingcat = this.category[this.categoryIndex].categoryname;
      }
      else {
        this.headingcat = this.category[0].categoryname;
      }
      this.id = this.headingcat;

      //if the question is -count change to 0
      if (this.index < 0 && this.categoryIndex == -1 && this.currentQuestions == 1) {

        this.index = 0;
        this.categoryIndex = 0;
      }
      else {

        //make the index 0 if it reaches negative value
        if (this.index == -1) {
          this.index = 0;
        }
        this.appendQuestions();

        //decrease the question count
        this.index = this.allQuestion.length - 1;
        this.currentQuestions = this.allQuestion.length;

        //check the categoey and append prev question
        if (this.index >= 0) {
          this.questions = this.allQuestion[this.index].Question;
        }
      }
    }

    var stat;

    // single progress bar
    this.singleProgressBar = this.singleProgressBar - 100 / this.totalquestionlist;

    //Reduce the progress bar for previous questions
    stat = this.progressBar[this.categoryIndex] - 100 / this.totalQuestions;
    this.progressBar[this.categoryIndex] = this.progressBar[this.categoryIndex] - 100 / this.totalQuestions;

    //Enable prev button for every 1.5s for decrease the speed
    // setTimeout(() => {
      if (this.index >= 0 && this.categoryIndex >= 0 && this.totalCurrentQuestion != 1) {
        this.buttonDisabled = false;
      }
    // }, 1500);

    //disable prev in first question
    if (this.index <= 0 && this.categoryIndex <= 0 && this.totalCurrentQuestion == 1) {
      this.buttonDisabled = true;
    }
    else {

    }
  }

  //success Toast
  showToasterSuccess() {
    this.notifyservice.showSuccess("Answers Submitted Successfully !!", "")
  }
}