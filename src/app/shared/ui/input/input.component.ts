import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { noop } from 'rxjs';

/**
 * custom input item component
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  /**
   *variables
   */
  placeholder = input<string>();
  /**
   * the type of the input default text
   */
  type = input<'text' | 'password' | 'email'>('text');
  /**
   * checking for validation errors
   */
  hasError = input<boolean | undefined>(false);

  /**
   * for correct work of visibility icon
   */
  initialType = input<'text' | 'password'>();
  /**
   * change visibility icon
   */
  isPassVisible = output<boolean>();
  isVisible = false;
  value = '';
  disabled = false;

  /**
   * function which will handle on input change
   */
  onChange: (value: string | boolean) => void = () => noop;
  onTouched: () => void = () => noop;

  /**
   *write value to form control
   * @param value
   */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
   *notify that the input has been changed
   * @param fn
   */
  registerOnChange(fn: (value: string | boolean) => void): void {
    this.onChange = fn;
  }

  /**
   *when the input filed was touched
   * @param fn
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * uncomment and add the actions for disabled input
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Handle on value changes
   * @param event
   */
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.onChange(input.value); //
  }

  /**
   * wherever the input isn't hover
   * Notify Angular Forms that the control has been touched
   */
  onInputBlur(): void {
    this.onTouched();
  }

  /**
   * toggle icon from visibility to visibility off
   * and emit input type to parent component
   */
  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.isPassVisible.emit(this.isVisible);
  }
}
