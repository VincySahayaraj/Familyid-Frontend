import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-started',
  templateUrl: './answer-started.component.html',
  styleUrls: ['./answer-started.component.css']
})
export class AnswerStartedComponent {

  visitorCategory: any;
  public value: any;

  ngOnInit() {
  
  }

  constructor(private router: Router) {

  }

  agegroupbtn(event: any) {

    this.visitorCategory = event.target.innerHTML

    //check the user is teen or adult
    if (this.visitorCategory.includes("Adult")) {
      this.value = 1;
    }
    else {
      this.value = 0;
    }

    //set the age category in localstorage
    localStorage.setItem('age', this.value);

    //navigates to questinnare section
    this.router.navigateByUrl('/fidquestionpage');
  }
}
