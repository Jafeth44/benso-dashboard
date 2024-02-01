import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Firestore, docData, updateDoc } from '@angular/fire/firestore';
import { Observable, map, take } from 'rxjs';
import { doc } from 'firebase/firestore';

import { sortByProperty } from 'sort-by-property';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { AgendarMantenimientoComponent } from '../../components/agendar-mantenimieto/agendar-mantenimieto.component';
import { DataService } from '../../data/data.service';
import { ToastrService } from 'ngx-toastr';

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
  private dataService = inject(DataService);
  private firestore = inject(Firestore);
  public toastr = inject(ToastrService);
  public location = inject(Location);
  public equipo$: Observable<GetEquiposDto>;
  public route: string;
  public sortBy = sortByProperty;
  public isLoading = false;
  public navigator = window.navigator;

  constructor() {
    this.route = this.activatedRoute.snapshot.params['id'];
    const aDoc = doc(this.firestore, "equipos", this.route);
    this.equipo$ = docData(aDoc) as Observable<GetEquiposDto>;
  }
  
  public async actualizarFoto(fotoRef: string | undefined, input: HTMLInputElement) {
    this.isLoading = true;
    if(fotoRef) {
      const fotoBorrar = await this.dataService.borrarImagen(fotoRef);
      if (fotoBorrar) {
        const fotoUpload = await this.dataService.subirImagen(input);
        if(fotoUpload) {
          await updateDoc(doc(this.firestore, "equipos", this.route), {
            fotoRef: fotoUpload[0],
            foto: fotoUpload[1]
          })
          this.isLoading = false;
          this.toastr.success("Foto actualizada correctamente");
        }else if(!fotoUpload) {
          this.isLoading = false;
          this.toastr.error("No se ha podido actualizar la foto");
        }
      }
    } else if(!fotoRef) {
      const fotoUpload = await this.dataService.subirImagen(input);
      if(fotoUpload) {
        await updateDoc(doc(this.firestore, "equipos", this.route), {
          fotoRef: fotoUpload[0],
          foto: fotoUpload[1]
        })
        this.isLoading = false;
        this.toastr.success("Foto actualizada correctamente");
      }else if(!fotoUpload) {
        this.isLoading = false;
        this.toastr.error("No se ha podido actualizar la foto");
      }
    }
  }

  public share() {
    const compartirEquipo: ShareData = {
      title: "Equipos Benso",
      text: "Información del activo "+this.route,
      url: window.location.href
    }
    this.navigator.share(compartirEquipo);
  }
}