import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule, Location } from '@angular/common';
import { DataService } from '../../data/data.service';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { Observable } from 'rxjs';
import { sortByProperty } from 'sort-by-property';
import { CustomTimePipe } from '../../pipes/customTime.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [LoaderComponent, CommonModule, CustomTimePipe, RouterLink],
  templateUrl: './mantenimiento-detalle.component.html',
  styles: ``
})
export class MantenimientoDetalleComponent {
  private dataService = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private toastr = inject(ToastrService);
  public equipo$: Observable<GetEquiposDto>;
  public location = inject(Location);
  public route: string;
  public sortBy = sortByProperty;
  public mantenimientoId: number;

  constructor() {
    this.route = this.activatedRoute.snapshot.params['id'];
    this.mantenimientoId = parseInt(this.activatedRoute.snapshot.params['mantenimientoId']);
    const aDoc = doc(this.firestore, "equipos", this.route);
    this.equipo$ = docData(aDoc) as Observable<GetEquiposDto>;
  }

  public isLoading: boolean = false;

  public deleteMantenimiento(equipo: GetEquiposDto): void {
    this.dataService.borrarMantenimiento(this.route, equipo.mantenimientos![this.mantenimientoId]);
    this.location.back();
    this.toastr.info("Mantenimiento borrado");
  }
}
