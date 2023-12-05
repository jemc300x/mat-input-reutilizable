import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

const ALLOW_KEYS: { [key: string]: boolean } = {
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
  ArrowDown: true,
  Tab: true,
  Backspace: true,
};

@Directive({
  selector: 'input [allowPatterns]',
})
export class AllowPatternsDirective implements OnInit {
  @Input() allowPatterns = '';

  @HostListener('keydown', ['$event'])
  private onKeydown(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;

    if (ALLOW_KEYS[key]) {
      return true;
    }

    return this.applyPatters(key);
  }

  @HostListener('paste', ['$event'])
  private onPaste(event: ClipboardEvent) {
    event.preventDefault();
    console.log('Paste: ', event);

    const data = event.clipboardData?.getData('text/plain');
    console.log(data);

    this.applyValidation(data);
  }

  constructor(
    private readonly element: ElementRef,
    @Optional() @Self() private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    console.log(this.allowPatterns);
  }

  applyValidation(data: string | undefined) {
    if (!data) {
      return;
    }

    console.log('Data on Paste', data);

    let validData: string[] = [];

    data.split('').forEach((char) => {
      console.log(char);
      if (this.applyPatters(char)) {
        validData.push(char);
      }
    });

    console.log('ValidDate', validData);
    const newValue = validData.join('');
    console.log('NewValue:', newValue);

    this.element.nativeElement.value = newValue;

    if (this.ngControl.control !== null) {
      this.ngControl.control.setValue(newValue);
    }
  }

  private applyPatters(key: string) {
    return new RegExp(this.allowPatterns).test(key);
  }
}
