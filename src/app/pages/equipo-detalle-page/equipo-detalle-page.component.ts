import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './equipo-detalle-page.component.html',
  styles: ``
})
export class EquipoDetallePageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public route!: string;
  ngOnInit(): void {
      
    this.route = this.activatedRoute.snapshot.params['id'];
  }
}
