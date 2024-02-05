import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../data/data.service';
import { ActivatedRoute } from '@angular/router';
import { CrearMantenimientoDto } from '../../data/dtos/CrearMantenimiento.dto';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  imports: [LoaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './mantenimiento-formulario-page.component.html',
  styles: `    
  #table-container {
    container-type: size;
  }
  `,
})
export class MantenimientoFormularioPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);
  private toastr = inject(ToastrService);
  public user$ = this.authService.authState$;
  public isLoading: boolean = false;
  public location = inject(Location);

  public nuevoMantenimientoForm: FormGroup = this.formBuilder.group({
    fecha: ['', Validators.required],
    horaInicio: [''],
    horaCierre: [''],
    tecnico: [''],
    detalle: [''],
    observaciones: [''],
    materiales: this.formBuilder.group({
      nitrogeno: [false],
      refrigerante: [false],
      tuberiaCobre: [false],
      soldadura: [false],
      nuBrite: [false]
    }),
    repuestos: this.formBuilder.group({
      capacitorArranque: [false],
      capacitorPermanente: [false],
      relay: [false],
      contactor: [false],
      controlador: [false],
      sensor: [false],
      capilar: [false],
      fusibles: [false],
      manillas: [false],
      abanicoEvaporador: [false],
      abanicoAxial: [false],
      abanicoCondensador: [false],
      pushBoton: [false],
      tuboLedGrande: [false],
      empaquePuerta: [false],
      compresor: [false],
      protectorTermico: [false],
      tuboLedPequeno: [false],
      interruptorLuz: [false],
      resistenciaDrenaje: [false],
      resistenciaEvaporador: [false],
      valvulaCarga: [false],
      filtroDeshidratador: [false],
      resistenciaPuerta: [false],
      vidrioPuertas: [false]
    })
  })

  //todo resetear valor invalid de cada formControl

  public async crearNuevoMantenimiento(userName: string | null) {
    this.isLoading = true;
    if (this.nuevoMantenimientoForm.invalid) {
      this.toastr.warning('Por favor revisa los datos');
      this.isLoading = false;
      return;
    }
    const nuevoMantenimiento: CrearMantenimientoDto = {
      fecha: this.nuevoMantenimientoForm.value.fecha,
      horaInicio: this.nuevoMantenimientoForm.value.horaInicio,
      horaCierre: this.nuevoMantenimientoForm.value.horaCierre,
      tecnico: userName ? userName :this.nuevoMantenimientoForm.value.tecnico,
      detalle: this.nuevoMantenimientoForm.value.detalle,
      observaciones: this.nuevoMantenimientoForm.value.observaciones,
      materiales: this.nuevoMantenimientoForm.value.materiales,
      repuestos: this.nuevoMantenimientoForm.value.repuestos,
    }
    try {
      await this.dataService.crearMantenimiento(
          this.activatedRoute.snapshot.params['id'], 
          nuevoMantenimiento
        );
      this.location.back();
      this.toastr.success('se ha guardado con éxito');
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.toastr.error('Se ha producido un error inesperado');
    }
  }
}
