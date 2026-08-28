import { Component } from '@angular/core';

@Component({
    selector: 'app-error-conexion-page',
    imports: [],
    templateUrl: './error-conexion-page.component.html',
    styles: ``
})
export class ErrorConexionPageComponent {
  public reintentar(): void {
    window.location.reload();
  }
}
