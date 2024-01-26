import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { combineLatest, debounceTime, map, Observable, tap } from 'rxjs';
import { DataService } from '../../data/data.service';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { toObservable } from '@angular/core/rxjs-interop';
import { sortByProperty } from 'sort-by-property';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clients-page.component.html',
  styles: /*css*/`
  #table-container {
    container-type: size;
  }
  `,
})
export class ClientsPageComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  public equipos$: Observable<GetEquiposDto[]>;
  public searchQuery = signal<string>('');
  public searchQuery$ = toObservable(this.searchQuery);
  public sortBy = sortByProperty;
  public equiposPorCliente: string[] = [];

  constructor() {
    this.equipos$ = this.dataService.equipos$;
  }

  public ngOnInit(): void {
    this.equipos$ = combineLatest([
      this.searchQuery$,
      this.equipos$
    ]).pipe(
      map(([search, equipos]) => equipos.filter(equipo => 
        equipo.activo?.startsWith(search.toUpperCase()) || 
        equipo.direccion?.includes(search.toUpperCase()) ||
        equipo.cliente?.includes(search.toUpperCase()) ||
        equipo.nombreLocal?.includes(search.toUpperCase())
        )),
      tap((equipos) => this.equiposPorCliente = [...new Set(equipos.map(e => e.cliente!).sort())]),
      debounceTime(500)
    )
  }

  public busquedaEquipos(value: string) {
    this.searchQuery.set(value);
  }
}