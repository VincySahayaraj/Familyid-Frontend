import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { NotifyService } from '../services/notify.service';
import { ResultService } from '../services/result.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fid-form',
  templateUrl: './fid-form.component.html',
  styleUrls: ['./fid-form.component.css']
})
export class FidFormComponent {

  registerForm!: any;
  visitorid!: any;
  inviteeid!: any;
  registerResponse!: any;
  othersValidity: any;
  visible: boolean = false;
  visitorname: any;
  othersValidation: any = false;
  inviteedetails: any;
  inviteename: any;
  inviteeemail: any;
  inviteefamilyrole: any;
  inviteeother: any;
  inviteephonenumber: any;
  isDisabled: boolean = false;
  familymemberid: any;
  submitted = false;
  Role: any = ['Father', 'Mother', 'Brother', 'Sister', 'Other'];

  fullWhitespaceFirstname: boolean = false;
  fullWhitespaceLastname: boolean = false;
  fullWhitespaceEmail: boolean = false;
  fullWhitespaceOther: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private registerservice: RegisterService,
    private spinnerService: NgxSpinnerService,
    private notifyservice: NotifyService,
    private resultservice: ResultService) {
  }

  ngOnInit() {

    //receive the visitor id from homepage
    this.visitorid = localStorage.getItem("visitorid");
    this.inviteeid = localStorage.getItem("inviteeid");
    this.familymemberid = localStorage.getItem("familymemberid");

    //check validation
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(1),
      Validators.maxLength(60),

      Validators.pattern(/^[a-zA-Z ]*$/)
      ]
      ],
      lastname: ['', [Validators.required, Validators.minLength(1),
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Z ]*$/)
      ]
      ],
      // email: ['', [Validators.required, Validators.email,
      // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      // ]],
      email: ['', [Validators.required,
      // Validators.pattern(/^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/)
      Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/),
        //Validators.pattern(/^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\s*$/)

        //Validators.pattern(/^[\s*[\w+\-.]+@[a-zA-Z\d\-]+(\.[a-zA-Z\d\-]+)*\s]*$/)
        // Validators.pattern(/^\s*[\w-]+(\.[\w-]+)*@\w+(\.\w+)*\s*$/)
        // Validators.pattern(/^\S+@\S+\.\S+$/)

        //Validators.pattern(/^(?!.*\s)\S+@\S+(?!.*\s)$/)

      ]],

      contactNo: ['', [Validators.pattern(/^(?!0+$)(?:\+1)?(?:\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}$/)]],
      familyrole: ['', [Validators.required]],
      other: ['',
        // [Validators.pattern(/^[a-zA-Z ]*$/)]
      ],
      visitorid: [this.visitorid],

    });


    //check if the memberidis available get the invitee details
    if (this.familymemberid) {
      this.getInviteeDetail(this.familymemberid);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  prevBtn() {
    this.router.navigateByUrl('/answerpage');
  }

  onSubmit() {

    this.submitted = true;
    this.spinnerService.show();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.spinnerService.hide();
      return;
    }

    // should not accept empty space
    if (this.registerForm.value.firstname && this.registerForm.value.firstname.trim().length == 0) {
      this.spinnerService.hide();
      this.fullWhitespaceFirstname = true;
      return
    }
    else {
      this.fullWhitespaceFirstname = false;
    }
    if (this.registerForm.value.lastname && this.registerForm.value.lastname.trim().length == 0) {
      this.fullWhitespaceLastname = true;
      this.spinnerService.hide();
      return
    }
    else {
      this.fullWhitespaceLastname = false;
    }
    // if (this.registerForm.value.email && this.registerForm.value.email.trim().length == 0) {
    //   this.fullWhitespaceEmail = true;
    //   this.spinnerService.hide();
    //   return
    // }
    // if (this.registerForm.value.other && this.registerForm.value.other.trim().length == 0) {
    //   this.fullWhitespaceOther = true;
    //   this.spinnerService.hide();
    //   return
    // }
    // else{
    //   this.fullWhitespaceOther  = false;
    // }



    // this.registerForm.value.email = this.registerForm.value.email.trim();

    if (this.registerForm.value.firstname) {
      this.registerForm.value.firstname = this.registerForm.value.firstname.trim();
    }
    if (this.registerForm.value.lastname) {
      this.registerForm.value.lastname = this.registerForm.value.lastname.trim();
    }
    if (this.registerForm.value.email) {
      this.registerForm.value.email = this.registerForm.value.email.trim();
    }
    // if(this.registerForm.value.familyrole=='Other'){

    // }


    //accept hyphens in phonenumber
    if (this.registerForm.value.contactNo) {
      this.registerForm.value.contactNo = this.registerForm.value.contactNo.replace(/-/gi, '')
    }

    //check whether the familyrole is other
    if (this.registerForm.value.familyrole == "Other") {
      // assign the other value into familyrole
      if (this.registerForm.value.other != "" && this.registerForm.value.other != null && this.registerForm.value.other != undefined) {
        if (this.registerForm.value.other.trim().length == 0) {
          this.spinnerService.hide();
          this.fullWhitespaceOther = true;
          return
        }
        this.registerForm.value.other = this.registerForm.value.other.trim();
        this.registerForm.value.familyrole = this.registerForm.value.other;
        this.othersValidation = false;
      }
      else {
        this.othersValidation = true;
        this.spinnerService.hide();
        return;
      }
    }

    if (this.familymemberid) {
      this.registerForm.value.email = this.inviteeemail;
      this.registerForm.value.contactNo = this.inviteephonenumber;
      this.registerForm.value.familyrole = this.inviteefamilyrole;
      if (this.registerForm.value.familyrole == 'Other') {
        this.registerForm.value.other = this.inviteeother;
      }
    }

    //enter the email is converted into lowercase
    if (this.registerForm.value.email) {
      this.registerForm.value.email = this.registerForm.value.email.toLowerCase();
    }

    this.visitorname = localStorage.setItem('visitorname', this.registerForm.value.firstname);
    this.registerForm.value = JSON.stringify(this.registerForm.value);
    this.spinnerService.show();

    //Call the service
    this.registerservice.createUser(this.registerForm.value).subscribe((response) => {
      this.registerResponse = response;
      if (this.registerResponse.result == "" || this.registerResponse.result == undefined) {
        this.spinnerService.hide()
        return
      }

      this.registerResponse.result = JSON.parse(this.registerResponse.result);
      localStorage.setItem('IsInvitee', this.registerResponse.result.IsInvitee);
      localStorage.setItem('visitorid', this.registerResponse.result.VisitorID);
      this.visitorid = localStorage.getItem('visitorid');
      this.resultservice.result = this.registerResponse.result;
      localStorage.setItem('familyid', this.registerResponse.result.Familyid);
      localStorage.setItem('familymemberid', this.registerResponse.result.FamilyMemberId);
      this.spinnerService.hide();
      if (this.registerResponse.apiStatus == 0) {
        this.showToasterSuccess();
        this.router.navigate(['/resultpage']);
      }
      else {
        this.showToasterError();
      }
    },
      (error: HttpErrorResponse) => {
        this.spinnerService.hide()
        this.showToasterError();
      }
    )
  }

  getInviteeDetail(familymemberid: any) {
    this.resultservice.getInviteeDetail(familymemberid).subscribe((response) => {
      this.inviteedetails = response;
      if (this.inviteedetails) {
        this.inviteedetails = JSON.parse(this.inviteedetails.result);
        this.inviteename = this.inviteedetails.Firstname;
        this.inviteeemail = this.inviteedetails.Email;
        this.inviteefamilyrole = this.inviteedetails.Familyrole;
        if (this.inviteefamilyrole == 'Other') {
          this.visible = !this.visible;
          this.inviteeother = this.inviteedetails.Other;
          this.registerForm.controls['other'].disable();
        }
        this.registerForm.controls['email'].disable();
        this.registerForm.controls['familyrole'].disable();
      }
    })
  }

  //success Toast
  showToasterSuccess() {
    this.notifyservice.showSuccess("Member Registered Successfully !!", this.registerForm.value.firstname)
  }

  //Error Toast
  showToasterError() {
    this.notifyservice.showError("There was an error register your details", "")
  }

  //if click 'other'in dropdown-add a extra input box
  CheckOthers(other: any, id: any) {
    if (other == 'Other') {
      this.visible = !this.visible;
      this.othersValidity = Validators.required;
    }
    else {
      this.visible = false;
      this.registerForm.get('other').reset();
    }
  }

  OtherAvailable() {

    //value available when inviting
    if (this.inviteeother) {
      return true
    }

    if (this.registerForm.value.familyrole == 'Other') {
      //check other field is empty or not
      if (this.registerForm.value.other != "" && this.registerForm.value.other != undefined && this.registerForm.value.other != null) {
        // this.submitted=true;
        return true
      }
      else {
      
        return false
      }
    }
    else{
    
      return false
    }

  }

  checkEmpty() {
    if (this.registerForm.value.firstname && this.registerForm.value.firstname.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkLastname() {
    if (this.registerForm.value.lastname && this.registerForm.value.lastname.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyOther() {
    if (this.registerForm.value.familyrole == 'Other') {
      if (this.registerForm.value.other && this.registerForm.value.other.trim().length == 0) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
}


