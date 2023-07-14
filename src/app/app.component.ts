import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formGroup: FormGroup = new FormGroup({
    productName: new FormControl(null, Validators.required),
    productCode: new FormControl(),
    productSerial: new FormControl(),
  });

  formControl: FormControl = new FormControl();
}
