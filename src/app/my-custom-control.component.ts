import {Component, OnInit, Self} from '@angular/core';
import {LookupModel} from './lookup-model';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';

@Component({
  selector: 'my-custom-control',
  template: `
    <mat-form-field id="userType">
      <mat-label>My Custom Component</mat-label>
      <mat-select [formControl]="formControl" (blur)="onTouched()">
        <mat-option *ngFor="let current of userTypes" [value]="current.id">{{current.name}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [``]
})
export class MyCustomControl implements OnInit, ControlValueAccessor {
  userTypes: LookupModel[];
  formControl: FormControl;
  onChange = (value: number) => {};
  onTouched = () => {};

  constructor(@Self() public controlDir: NgControl) {
    this.formControl = new FormControl();
    controlDir.valueAccessor = this;
    this.userTypes = [
      new LookupModel(1, 'first'),
      new LookupModel(2, 'second')
    ];
  }

  ngOnInit(): void {
    this.formControl.setValidators(this.controlDir.control.validator);
    this.formControl.setValue(this.controlDir.control.value);
  }

  ngDoCheck() {
    if (this.formControl.touched) {
      return;
    }
    if (this.controlDir.control.touched) {
      this.formControl.markAsTouched();
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.formControl.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  writeValue(value: number): void {
    this.formControl.setValue(value);
    this.onChange(value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }


}
