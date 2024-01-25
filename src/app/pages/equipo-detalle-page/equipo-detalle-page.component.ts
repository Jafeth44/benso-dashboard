import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Firestore, docData } from '@angular/fire/firestore';
import { Observable, map, take } from 'rxjs';
import { doc } from 'firebase/firestore';

import { sortByProperty } from 'sort-by-property';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { AgendarMantenimientoComponent } from '../../components/agendar-mantenimieto/agendar-mantenimieto.component';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, LoaderComponent, AgendarMantenimientoComponent],
  templateUrl: './equipo-detalle-page.component.html',
  styles: /*css*/`
    #table-container {
      container-type: size;
    }
  `
})
export class EquipoDetallePageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  public equipo$: Observable<GetEquiposDto>;
  public location = inject(Location);
  public route: string;
  public sortBy = sortByProperty;

  constructor() {
    this.route = this.activatedRoute.snapshot.params['id'];
    const aDoc = doc(this.firestore, "equipos", this.route);
    this.equipo$ = docData(aDoc) as Observable<GetEquiposDto>;
  }
}
