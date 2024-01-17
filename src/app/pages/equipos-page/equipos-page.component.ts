import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DataService } from '../../data/data.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipos-page.component.html',
  styles: ``,
})
export class EquiposPageComponent {
  // private firestore = inject(Firestore);
  private dataService = inject(DataService);
  public equipo$: Observable<any[]>;
  
  constructor() {
    this.equipo$ = this.dataService.todosLosEquipos;
  }
}
