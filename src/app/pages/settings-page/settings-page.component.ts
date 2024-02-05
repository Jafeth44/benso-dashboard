import { Component, inject } from '@angular/core';
import { EmailAuthProvider, User, reauthenticateWithCredential, updatePassword, updateProfile } from '@angular/fire/auth';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../data/data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [LoaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styles: ``
})
export class SettingsPageComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toast = inject(ToastrService);
  private readonly dataService = inject(DataService);
  public isAdmin$ = this.dataService.isAdmin$;
  public user$ = this.authService.authState$;
  public location = inject(Location);
  public isLoading: boolean = false;

  public nuevoUsuarioForm = this.formBuilder.group({
    account: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    displayName: ['', Validators.required]
  })

  public async updateName(user: User, newName: string) {
    this.isLoading = true;
    try {
      if(!user) {
        this.isLoading = false;
        this.toast.error('Ocurrió un error inesperado');
        return;
      }
      await updateProfile(user, {
        displayName: newName
      })
      this.isLoading = false;
      this.toast.success('Cambio de nombre exitoso');
      return;
    } catch (error) {
      this.isLoading = false;
      this.toast.error('Ocurrió un error inesperado');
      return;
    }
  }

  public nuevoUsuario() {
    if (this.nuevoUsuarioForm.invalid) return;

    this.authService.registerWithEmail({
      account: this.nuevoUsuarioForm.value.account!,
      password: this.nuevoUsuarioForm.value.password!,
      displayName: this.nuevoUsuarioForm.value.displayName!
    })
   
  }

  public async updatePassword(user: User, oldPassword: string, newPassword: string) {
    this.isLoading = true;
    try {
      if(!user) {
        this.isLoading = false;
        this.toast.error('Ocurrió un error inesperado');
        return;
      }
      const authProvider = EmailAuthProvider.credential(user.email!, oldPassword);
      await reauthenticateWithCredential(user, authProvider);
      await updatePassword(user, newPassword);
      this.isLoading = false;
      this.toast.success('Ha cambiado la contraseña correctamente');
      return;
    } catch (error) {
      this.isLoading = false;
      this.toast.error('Ocurrió un error inesperado');
      return;
    }
  }
}
