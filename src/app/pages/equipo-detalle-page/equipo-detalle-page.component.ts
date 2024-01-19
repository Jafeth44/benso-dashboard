import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Firestore, docData } from '@angular/fire/firestore';
import { Observable, map, take } from 'rxjs';
import { doc } from 'firebase/firestore';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GetEquiposLocalDto } from '../../data/dtos/GetEquiposLocal.dto';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, LoaderComponent],
  templateUrl: './equipo-detalle-page.component.html',
  styles: ``
})
export class EquipoDetallePageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  public equipo$: Observable<any>;
  public route: string;
  public equipo!: GetEquiposLocalDto;
  public navigator = window.navigator;

  constructor() {
    this.route = this.activatedRoute.snapshot.params['id'];
    const aDoc = doc(this.firestore, "equipos", this.route);
    this.equipo$ = docData(aDoc) as Observable<any>;
  }

  public shareData() {
    this.navigator.share({
      title: this.equipo.direccion || 'Ubicación de equipo '+ this.equipo.activo,
      url: this.equipo.ubicacion
    })
  }

  ngOnInit(): void {
    this.equipo$.pipe(
      take(1),
      map((equipo : GetEquiposLocalDto) => this.equipo = equipo),
    ).subscribe();
  }
}
