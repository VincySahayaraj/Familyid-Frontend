
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { InviteService } from '../services/invite.service';
import { NotifyService } from '../services/notify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fid-groupform',
  templateUrl: './fid-groupform.component.html',
  styleUrls: ['./fid-groupform.component.css']
})
export class FidGroupformComponent {

  submitted = false;
  inviteValue: any;
  public inviteForm!: FormGroup;
  inviteeid: any;
  sendEmail: any;
  mailReply: any;
  visible: boolean = false;
  other: any;
  invitorindex = 0;
  isinvalid: boolean = false;
  invalidOther: any = false;
  otherAvailable:boolean=false;
  familymemberid: any;
  encodeurl: any;
  familymemberidcheck: any;
  Role: any = ['Father', 'Mother', 'Brother', 'Sister', 'Other'];
  show: boolean = true;
 


  fullWhitespaceFirstname: boolean = false;
  fullWhitespaceLastname: boolean = false;
  fullWhitespaceEmail: boolean = false;
  fullWhitespaceOther: boolean = false;

  a: any[] = Array();

  //redirect to questionare page
  prevBtn() {
    this.router.navigateByUrl('/fidquestionpage');
  }

  //redirect to result page
  showResults() {
    this.router.navigateByUrl('/resultpage');
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inviteservice: InviteService,
    private spinnerService: NgxSpinnerService,
    private notifyservice: NotifyService) {
    //get the family memeber id
    this.familymemberid = localStorage.getItem('familymemberid');
  }

  ngOnInit() {

    //get the form values in form builder
    this.inviteForm = this.formBuilder.group({
      invitor: this.formBuilder.array([this.createInviteFormGroup(), this.createInviteFormGroup()])
    });

    // store id from url
    this.route.queryParams
      .subscribe(params => {
        this.familymemberidcheck = params['familymemberid'];
        if (this.familymemberidcheck) {
          this.familymemberid = encodeURIComponent(this.familymemberidcheck);
          localStorage.setItem('familymemberid', this.familymemberid);
          localStorage.removeItem('visitorid');
        }
      }
      );
  }

  private createInviteFormGroup(): FormGroup {

    //check validation
    return new FormGroup({
      'name': new FormControl('',
        [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60),
        Validators.pattern(/^[a-zA-Z ]*$/)]),
      'email': new FormControl('',
        [Validators.required,
        // Validators.email,
        Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/),
        // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
        //Validators.pattern(/^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/)
        ]),
      'familyrole': new FormControl('', [Validators.required]),
      'other': new FormControl(''),
    })
  }

  //Add form for filling invitee detail
  public addEmailFormGroup() {
    const invitor = this.inviteForm.get('invitor') as FormArray
    invitor.push(this.createInviteFormGroup())
  }

  getControls() {
    return (this.inviteForm.get('invitor') as FormArray).controls;
  }

  //Remove form for filling invitee detail
  public removeOrClearEmail(i: number) {
    const invitor = this.inviteForm.get('invitor') as FormArray;

    //Check the form array is not null, then remove the single form
    if (invitor.length > 1) {
      invitor.removeAt(i)
    } else {
      invitor.reset();
    }
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.inviteForm;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.inviteForm.invalid) {
      return;
    }

    //check the formarray for other field
    for (let i = 0; i < this.inviteForm.value.invitor.length; i++) {
      if (!this.checkPattern(i)) {
        this.invalidOther = true;
        break;
      }
      if(this.checkEmpty(i)){
        this.invalidOther = true;
        break;
      }
      if(this.inviteForm.value.invitor[i].familyrole=='Other'){
        if(!this.checkEmptyOther(i)){
          this.invalidOther = true;
          break; 
        }
        if(this.checkSpaceOther(i)){
          this.invalidOther = true;
          break; 
        }
      }
    }

    //stop here if other field is invalid
    if (this.invalidOther == true) {
      return
    }

    for (let i = 0; i < this.inviteForm.value.invitor.length; i++) {
      this.inviteForm.value.invitor[i].email = this.inviteForm.value.invitor[i].email.toLowerCase();
      
      if (this.inviteForm.value.invitor[i].email && this.inviteForm.value.invitor[i].email.trim().length == 0) {
        this.spinnerService.hide();
        var formElement = <HTMLFormElement>document.getElementById("fullWhitespaceEmail_" + i);
        formElement.style.display = 'flex';
        return
      }
      else {
        this.spinnerService.hide();
        var formElement = <HTMLFormElement>document.getElementById("fullWhitespaceEmail_" + i);
        formElement.style.display = 'none';

      }

      this.inviteForm.value.invitor[i].name = this.inviteForm.value.invitor[i].name.trim();
      // check and make the other value as familyrole
      if (this.inviteForm.value.invitor[i].familyrole == 'Other') {
        if (this.inviteForm.value.invitor[i].other != "") {
          // this.isinvalid = false;
          // this.otherAvailable=false;
          this.inviteForm.value.invitor[i].other = this.inviteForm.value.invitor[i].other.trim();
          this.inviteForm.value.invitor[i].familyrole = this.inviteForm.value.invitor[i].other;
        }
        else {
          // this.otherAvailable=true;
          return;
        }
      }
    }

    //stop here if other field is invalid
    // if (this.isinvalid) {
    //   return;
    // }

    //Converted in format
    this.inviteValue = this.inviteForm.value;
    this.sendEmail = {
      familymemberid: this.familymemberid,
      invitors: this.inviteValue,
    }

    //Final form values
    this.sendEmail = JSON.stringify(this.sendEmail);

    //Call the service
    this.familymemberid = localStorage.getItem('familymemberid')
    if (!this.familymemberid) {
      this.showToasterOtherError();
      return;
    }

    this.spinnerService.show();
   
    this.inviteservice.sendInvite(this.sendEmail).subscribe((response) => {
      this.mailReply = response;

      //Mail response based on success msg
      if (this.mailReply.apiStatus == 0) {
        this.showToasterSuccess();
        //this.inviteForm.reset();
        this.sendInvite();
        this.spinnerService.hide();
      }
      else {

        this.spinnerService.hide();
        this.showToasterOtherError();
        this.inviteForm.reset();
      }
    },
      (error: HttpErrorResponse) => {
        this.spinnerService.hide()
        this.showToasterOtherError();
      }
    )
  }

  //redirect to confirmation page
  sendInvite() {
    this.router.navigateByUrl('/confirmationpage');
  }

  //success Toast
  showToasterSuccess() {
    this.notifyservice.showSuccess("Invitation Mail Sent Successfully !!", "Invited")
  }
  //Error Toast
  showToasterError() {
    this.notifyservice.showError("All invitation mail id's already invited.", "Please do check")
  }

  showToasterOtherError() {
    this.notifyservice.showError("There was an error sending the invitation", "Sorry!")

  }
  //warning Toast
  showToasterWarning() {
    this.notifyservice.showWarning('', "Below invitation mail id's already invited.Please do check. Other email invitation are sent succesfully")
  }

  //validation for other field
  checkPattern(i: any) {
    var re = new RegExp(/^[a-zA-Z ]*$/);
    if (re.test(this.inviteForm.value.invitor[i].other)) {
      this.invalidOther = false;
      return true;
    }
    else {
      this.invalidOther = true;
      return false;
    }
  }

  //validation for other field
  OtherFieldValidation(i: any) {
    if (this.inviteForm.value.invitor[i].familyrole == 'Other') {
      if (this.inviteForm.value.invitor[i].other != null && this.inviteForm.value.invitor[i].other != "" && this.inviteForm.value.invitor[i].other != undefined) {
        this.inviteForm.value.invitor[this.invitorindex].familyrole = this.inviteForm.value.invitor[i].other;
        this.isinvalid = false;
        return true;
      }
      else {
        this.isinvalid = true;
        return false;
      }
    }
    else {
      this.isinvalid = false;
      return true;
    }
  }

  get g() {
    return this.inviteForm.value
  }

  //check the other field click in which form
  CheckOthers(other: any, i: any) {
    if (other == 'Other') {
      this.a.push(i);
      var formElement = <HTMLFormElement>document.getElementById("otherchange_" + i);
      formElement.style.display = 'flex';
    }
    else {
      var formElement = <HTMLFormElement>document.getElementById("otherchange_" + i);
      formElement.style.display = 'none';
      this.a.map((element, ind) => {

        if (ind == i) {
          const index = this.a.indexOf(element);
          if (index > -1) { // only splice array when item is found
            this.a.splice(index, 1); // 2nd parameter means remove one item only
          }
          this.inviteForm.value.invitor.map((element: any, index: any) => {
            if (index == i) {
              element.other = "";
            }
          })
        }
      });
    }
  }

  checkEmpty(i:any){
      if (this.inviteForm.value.invitor[i].name && this.inviteForm.value.invitor[i].name.trim().length == 0) {
        return true
      }
      else{
        return false
      }
  }

  checkEmptyOther(i:any){
    // if (this.inviteForm.value.invitor[i].familyrole == 'Other') {
      if (this.inviteForm.value.invitor[i].other != "" && this.inviteForm.value.invitor[i].other != null && this.inviteForm.value.invitor[i].other != undefined) {
        return true
      }
      else{
        return false
      }
    
    // else{
    //   console.log("familyrole",this.inviteForm.value.invitor[i].other)
    //   return false
    // }
  }

  checkSpaceOther(i:any){
    if (this.inviteForm.value.invitor[i].other && this.inviteForm.value.invitor[i].other.trim().length == 0) {
      return true
    }
    else {
      return false
    } 
  }
}
