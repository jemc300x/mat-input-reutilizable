import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface FormControlErrorMessage {
  formControlName: string;
  validations: {
    errorName: string;
    message: string;
  }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    productName: new FormControl(null, Validators.required),
    productCode: new FormControl(null, [
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    productSerial: new FormControl(),
  });

  formControl: FormControl = new FormControl();
  errorMessage: { [key: string]: string } = {};

  formControlErrorMessages: FormControlErrorMessage[] = [
    {
      formControlName: 'productCode',
      validations: [
        {
          errorName: 'minlength',
          message: 'The min length must be 5',
        },
        {
          errorName: 'maxlength',
          message: 'The max length must be 10',
        },
      ],
    },
    {
      formControlName: 'productName',
      validations: [
        {
          errorName: 'required',
          message: 'This field is required',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.onListenerFormsStatus();
  }

  onListenerFormsStatus() {
    this.getError();
    this.formGroup.statusChanges.subscribe((status) => {
      console.log('Status:', status);
      this.getError();
    });
  }

  getError() {
    console.log('ProductCode', this.formGroup.get('productName')?.errors);

    this.formControlErrorMessages.forEach((formControlErrorMessage) => {
      const formControl = this.formGroup.get(
        formControlErrorMessage.formControlName
      );
      formControlErrorMessage.validations.forEach((validation) => {
        if (formControl?.hasError(validation.errorName)) {
          this.errorMessage[formControlErrorMessage.formControlName] =
            validation.message;
        }
      });
    });
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    console.log('Save:', this.formGroup.value);
  }
}
