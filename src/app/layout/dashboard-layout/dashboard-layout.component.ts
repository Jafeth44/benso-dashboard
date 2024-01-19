import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../data/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private toastr      = inject(ToastrService);
  private router      = inject(Router);

  public async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/auth');
    this.toastr.info("Ha cerrado sesión");
  }
}
