import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DataService } from '../../data/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipos-page.component.html',
  styles: /*css*/`
  `,
})
export class EquiposPageComponent {
  private dataService = inject(DataService);
  public equipo$: Observable<any[]>;
  
  constructor() {
    this.equipo$ = this.dataService.todosLosEquipos;
  }
}
