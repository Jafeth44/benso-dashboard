import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';
import { CrearEquipoConLocalDto } from '../../data/dtos/CreateEquipoConLocal.dto';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { Observable, map, tap } from 'rxjs';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, LoaderComponent, AutocompleteComponent],
  templateUrl: './nuevo-equipo-page.component.html',
  styles: `
      #table-container {
      container-type: size;
    }`,
})
export class NuevoEquipoPageComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  public equipos$: Observable<GetEquiposDto[]> = this.dataService.equipo$;
  public clientes!: Observable<string[]>;
  public isLoading: boolean = false;
  public isFormInvalid: boolean = false;

  public nuevoEquipoForm: FormGroup = this.formBuilder.group({
    activo: ['', Validators.required],
    modelo: [''],
    serie: [''],
    cliente: [''],
    nombreLocal: [''],
    telefono: ['', Validators.pattern(/^\d{8}$|^\d{4}\s\d{4}$|^\d{4}\-\d{4}$/)],
    direccion: [''],
    encargado: [''],
    fechaDeEntrega: [''],
    ubicacion: [''],
    foto: ['']
  })

  public ngOnInit(): void {
    this.clientes = this.equipos$.pipe(
      map((equipos) => [...new Set(equipos.map(e => e.cliente!).sort())].filter(c => c != ''))
    )
  }

  public  resetFormStatus(): void {
    this.isFormInvalid = false;
  }

  public async createNewEquipo(input: HTMLInputElement) {
    this.isLoading = true;
    this.nuevoEquipoForm.markAsDirty();
    if (this.nuevoEquipoForm.invalid) {
      this.isFormInvalid = true;
      this.toastr.warning('Por favor revisa los datos');
      this.isLoading = false;
      return;
    }
    const nuevoEquipo: CrearEquipoConLocalDto = {
      activo: this.nuevoEquipoForm.value.activo,
      modelo: this.nuevoEquipoForm.value.modelo.toUpperCase(),
      serie: this.nuevoEquipoForm.value.serie.toUpperCase(),
      cliente: this.nuevoEquipoForm.value.cliente.toUpperCase(),
      nombreLocal: this.nuevoEquipoForm.value.nombreLocal.toUpperCase(),
      telefono: this.nuevoEquipoForm.value.telefono.replace(/\D/g,''),
      direccion: this.nuevoEquipoForm.value.direccion.toUpperCase(),
      encargado: this.nuevoEquipoForm.value.encargado.toUpperCase(),
      fechaDeEntrega: this.nuevoEquipoForm.value.fechaDeEntrega,
      ubicacion: this.nuevoEquipoForm.value.ubicacion,
      proximoMantenimiento: ''
    }
    try {
      const fotoUpload = await this.dataService.subirImagen(input);
      nuevoEquipo.foto = fotoUpload || "";
      await this.dataService.crearEquipo(nuevoEquipo);
      this.isLoading = false;
      this.toastr.success('Se ha creado correctamente','Guardado');
      this.router.navigateByUrl('/dashboard/equipos');
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.isFormInvalid = true;
      this.toastr.error('Se ha producido un error inesperado');
      return;
    }
  }
}
