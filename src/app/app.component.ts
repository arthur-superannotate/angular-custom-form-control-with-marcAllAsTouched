import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LookupModel} from './lookup-model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  form: FormGroup;
  userTypes: LookupModel[];

  constructor(private readonly formBuilder: FormBuilder){
    this.userTypes = [
      new LookupModel(1, 'first'),
      new LookupModel(2, 'second')
    ];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group( {
      userTypeCustomControl:['', [Validators.required]],
      userTypePlainControl:['', [Validators.required]]
    });
  }

  doSomething(){
    this.form.markAllAsTouched();
  }
}
