import { Component, OnInit, inject, signal } from '@angular/core';
import { DataService } from '../../data/data.service';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, debounceTime, map } from 'rxjs';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { toObservable } from '@angular/core/rxjs-interop';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mantenimiento-page.component.html',
  styles: ``
})
export class MantenimientoPageComponent implements OnInit {
  private dataService = inject(DataService);
  public equipos$: Observable<GetEquiposDto[]>;
  public searchInput = signal('');
  public searchInput$ = toObservable(this.searchInput);

  constructor() {
    this.equipos$ = this.dataService.equipo$;
  }

  ngOnInit(): void {
    this.equipos$ = combineLatest([
      this.searchInput$,
      this.equipos$
    ]).pipe(
      debounceTime(500),
      map(([search, equipos]) => equipos.filter(x => x.activo.startsWith(search))),
    )
  }

  public busquedaEquipo(value: string): void {
    this.searchInput.set(value);
  }
}
