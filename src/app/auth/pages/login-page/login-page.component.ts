import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, Credentials } from '../../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router);
  public isFormInvalid: boolean = false;

  public form = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      persistanse: false
    } 
  );

  public  resetFormStatus(): void {
    this.isFormInvalid = false;
  }

  public async login() {
    this.form.markAsDirty();
    if (this.form.invalid) {
      this.isFormInvalid = true;
      return;
    };
    const credentials: Credentials = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    try {
      await this.authService.loginWithEmail(credentials, this.form.value.persistanse!);
      this.router.navigateByUrl('/');
    } catch (error) {
      this.isFormInvalid = true;
      return;
    } 
  }
}
