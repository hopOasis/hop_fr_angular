import { inject, signal } from '@angular/core';
import { validation } from '../../utils/validators';
import { CheckoutStoreService } from '../data-access/checkout-store.service';

export function customValidator() {
  const checkoutStore = inject(CheckoutStoreService);
  const controls = {
    phone: { valid: false, touched: false },
    name: { valid: false, touched: false },
    surname: { valid: false, touched: false },
    email: { valid: false, touched: false },
  };
  const controller = signal(controls);

  const nameRegEx =
    /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]{3,30}(-[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]{1,29})?$/;
  const phoneRegEx = /^\+380\d{9}$/;
  const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const onChange = (
    event: Event,
    regEx: RegExp,
    contr: keyof typeof controls,
  ): void => {
    const inputTarget = event.target as HTMLInputElement;
    inputTarget.addEventListener('change', (event) => {
      event.stopImmediatePropagation();
      controller.update((controls) => ({
        ...controls,
        [contr]: { valid: validation(inputTarget.value, regEx), touched: true },
      }));
    });

    controller.update((controls) => ({
      ...controls,
      [contr]: { valid: validation(inputTarget.value, regEx), touched: true },
    }));

    if (contr === 'phone') {
      checkoutStore.updatePaymentDataReq(
        'customerPhoneNumber',
        inputTarget.value,
      );
    }
  };

  return {
    onChange,
    controller,
    nameRegEx,
    emailRegEx,
    phoneRegEx,
  };
}
