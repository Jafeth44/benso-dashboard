import { Component, inject } from '@angular/core';
import { Auth, EmailAuthProvider, User, reauthenticateWithCredential, updatePassword, updateProfile } from '@angular/fire/auth';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from '../../auth/auth.service';

@Component({
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './settings-page.component.html',
  styles: ``
})
export class SettingsPageComponent {
  private readonly auth = inject(Auth);
  private readonly toast = inject(ToastrService);
  private user?: User | null = this.auth.currentUser;
  public isLoading: boolean = false;

  public async updateName(newName: string) {
    this.isLoading = true;
    try {
      if(!this.user) {
        this.isLoading = false;
        this.toast.error('Ocurrió un error inesperado');
        return;
      }
      await updateProfile(this.user, {
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

  public async updatePassword(oldPassword: string, newPassword: string) {
    this.isLoading = true;
    try {
      if(!this.user) {
        this.isLoading = false;
        this.toast.error('Ocurrió un error inesperado');
        return;
      }
      const authProvider = EmailAuthProvider.credential(this.user.email!, oldPassword);
      await reauthenticateWithCredential(this.user, authProvider);
      await updatePassword(this.user, newPassword);
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
