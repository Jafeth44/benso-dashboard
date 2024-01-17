import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';
import { CrearEquipoConLocalDto } from '../../data/dtos/CreateEquipoConLocal.dto';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './nuevo-equipo-page.component.html',
  styles: ``
})
export class NuevoEquipoPageComponent {
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);
  private location = inject(Location);
  public isFormInvalid: boolean = false;
  public nuevoEquipoForm: FormGroup = this.formBuilder.group({
    modelo: ['', Validators.required],
    activo: ['', Validators.required],
    serie: ['', Validators.required],
    nombreLocal: [''],
    telefono: ['', Validators.pattern(/^\d{8}$|^\d{4}\s\d{4}$|^\d{4}\-\d{4}$/)],
    direccion: [''],
    encargado: [''],
    fechaDeEntrega: [''],
    ubicacion: [''],
    foto: ['']
  })

  public  resetFormStatus(): void {
    this.isFormInvalid = false;
  }

  public async createNewEquipo() {
    this.nuevoEquipoForm.markAsDirty();
    if (this.nuevoEquipoForm.invalid) {
      this.isFormInvalid = true;
      console.log('problemas de form');
      return;
    }
    const nuevoEquipo: CrearEquipoConLocalDto = {
      modelo: this.nuevoEquipoForm.value.modelo,
      activo: this.nuevoEquipoForm.value.activo,
      serie: this.nuevoEquipoForm.value.serie,
      nombreLocal: this.nuevoEquipoForm.value.nombreLocal,
      telefono: this.nuevoEquipoForm.value.telefono.replace(/\D/g,''),
      direccion: this.nuevoEquipoForm.value.direccion,
      encargado: this.nuevoEquipoForm.value.encargado,
      fechaDeEntrega: this.nuevoEquipoForm.value.fechaDeEntrega,
      ubicacion: this.nuevoEquipoForm.value.ubicacion,
      foto: this.nuevoEquipoForm.value.foto
    }
    try {
      const saved = await this.dataService.crearEquipo(nuevoEquipo);
      console.log(saved);
      this.location.back();
    } catch (error) {
      console.log(error);
      this.isFormInvalid = true;
      return;
    }
  }
}
