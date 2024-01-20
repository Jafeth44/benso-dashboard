import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DataService } from '../../data/data.service';
import { ToastrService } from 'ngx-toastr';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';

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
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(DataService);
  public equipo$: Observable<any[]>;
  public equipos!: GetEquiposDto[];
  public paginaActual!: GetEquiposDto[];

  public searchQuery = signal<string>('');

  public numeroPaginas!: number;
  public numeroPaginaActual: number = 1;

  constructor() {
    this.equipo$ = this.dataService.equipo$;
  }

  public ngOnInit() {
    this.equipo$.pipe(
      take(1),
      map((equipos: GetEquiposDto[]) => this.equipos = equipos),
      tap(equipo => this.llenarPaginas())
    ).subscribe(x => this.numeroPaginas = Math.ceil(x.length / 10));
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