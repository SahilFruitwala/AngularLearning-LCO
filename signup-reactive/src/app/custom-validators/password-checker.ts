import { FormGroup } from '@angular/forms';

export function PasswordChecker(
  controlName: string,
  compareControlName: string
) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[controlName];
    const ConfirmPassword = formGroup.controls[compareControlName];

    if (password.value !== ConfirmPassword.value) {
      ConfirmPassword.setErrors({ mustmatch: true });
    } else {
      ConfirmPassword.setErrors(null);
    }
  };
}
