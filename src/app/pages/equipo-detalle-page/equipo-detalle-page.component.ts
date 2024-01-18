import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { DataService } from '../../data/data.service';
import { Firestore, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc } from 'firebase/firestore';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './equipo-detalle-page.component.html',
  styles: ``
})
export class EquipoDetallePageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  public equipo$: Observable<any>;
  public route: string;

  constructor() {
    this.route = this.activatedRoute.snapshot.params['id'];
    const aDoc = doc(this.firestore, "equipos", this.route);
    this.equipo$ = docData(aDoc) as Observable<any>;
  }
}
