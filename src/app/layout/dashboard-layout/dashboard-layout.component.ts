import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data/data.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styles: ''
})
export class DashboardLayoutComponent {
  public authService = inject(AuthService);
  public dataService = inject(DataService);
  private toastr      = inject(ToastrService);
  private router      = inject(Router);

  public async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/auth');
    this.toastr.info("Ha cerrado sesión");
  }
}