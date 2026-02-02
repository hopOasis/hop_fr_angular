import { AbstractControl, FormGroup } from '@angular/forms';

export const getControl = (
  form: FormGroup,
  contr: string,
): AbstractControl | null => form.get(contr);
