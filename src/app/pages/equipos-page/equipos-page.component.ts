import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, debounceTime, map, Observable, take, tap } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DataService } from '../../data/data.service';
import { ToastrService } from 'ngx-toastr';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipos-page.component.html',
  styles: /*css*/`
  #table-container {
    container-type: size;
  }
  `,
})
export class EquiposPageComponent implements OnInit {
  // private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(DataService);
  public equipos$: Observable<GetEquiposDto[]>;
  public searchQuery = signal<string>('');
  public searchQuery$ = toObservable(this.searchQuery);


  public equipos!: GetEquiposDto[];
  public paginaActual!: GetEquiposDto[];


  public numeroPaginas!: number;
  public numeroPaginaActual: number = 1;

  constructor() {
    this.equipos$ = this.dataService.equipo$;
  }

  public ngOnInit(): void {
    this.equipos$ = combineLatest([
      this.searchQuery$,
      this.equipos$
    ]).pipe(
      debounceTime(500),
      map(([search, equipos]) => equipos.filter(equipo => equipo.activo.startsWith(search.toUpperCase()) || equipo.direccion?.includes(search.toUpperCase())))
    )
  }

  public llenarPaginas() {
    this.paginaActual = this.equipos.slice(0,10);
  }

  cambioDePagina(value: number): void {
    this.numeroPaginaActual = value + 1;
    this.paginaActual = this.equipos.slice(
      value * 10,
      value * 10 + 10
    );
  }

  public busquedaEquipos(value: string) {
    this.searchQuery.set(value);
  }
}