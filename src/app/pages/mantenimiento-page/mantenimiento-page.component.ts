import { Component, OnInit, inject, signal } from '@angular/core';
import { DataService } from '../../data/data.service';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, debounceTime, map } from 'rxjs';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AgendarMantenimientoComponent } from '../../components/agendar-mantenimieto/agendar-mantenimieto.component';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { sortByProperty } from 'sort-by-property';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, AgendarMantenimientoComponent],
  templateUrl: './mantenimiento-page.component.html',
  styles: /*css*/`
  #table-container {
    container-type: size;
  }
  `,
})
export class MantenimientoPageComponent implements OnInit {
  private dataService = inject(DataService);
  public equipos$: Observable<GetEquiposDto[]>;
  public searchQuery = signal<string>('');
  public searchQuery$ = toObservable(this.searchQuery);
  public sortBy = sortByProperty;

  constructor() {
    this.equipos$ = this.dataService.equipos$;
  }

  public ngOnInit(): void {
    this.equipos$ = combineLatest([
      this.searchQuery$,
      this.equipos$
    ]).pipe(
      map(([search, equipos]) => equipos.filter(equipo => 
        equipo.activo.startsWith(search.toUpperCase()) || 
        equipo.direccion?.includes(search.toUpperCase())
      )),
      debounceTime(500)
    )
  }

  public busquedaEquipos(value: string) {
    this.searchQuery.set(value);
  }
}
