import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../data/data.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mantenimiento-page.component.html',
  styles: ``
})
export class MantenimientoPageComponent {
  private dataService = inject(DataService);
  public equipos$: Observable<GetEquiposDto[]>;

  constructor() {
    this.equipos$ = this.dataService.equipo$;
  }
}
