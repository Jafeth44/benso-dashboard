import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../data/data.service';
import { CrearEquipoConLocalDto } from '../../data/dtos/CreateEquipoConLocal.dto';
import { ToastrService } from 'ngx-toastr';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { GetEquiposDto } from '../../data/dtos/GetEquipos.dto';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, LoaderComponent, AutocompleteComponent, MatAutocompleteModule],
  templateUrl: './editar-equipo-page.component.html',
  styles: `
      #table-container {
      container-type: size;
    }`,
})
export class EditarEquipoPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private changedetection = inject(ChangeDetectorRef);
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  public esAdmin$ = this.dataService.isAdmin$;
  public equipos$: Observable<GetEquiposDto[]> = this.dataService.equipos$;
  public clientes!: Observable<string[]>;
  public isLoading: boolean = false;
  public isFormInvalid: boolean = false;
  public route = this.activatedRoute.snapshot.params['id'];
  public nuevoEquipoForm!: FormGroup;
  public items$!: Observable<string[]>;

  public input = signal('');
  public input$ = toObservable(this.input);

  public ngOnInit(): void {
    this.clientes = this.equipos$.pipe(
      map((equipos) => [...new Set(equipos.map(e => e.cliente!))].filter(c => c != ''))
    );

    this.items$ = combineLatest([
      this.clientes,
      this.input$
    ]).pipe(
      map(([items, input]) => items.filter(
        item => item.includes(input.toUpperCase())
      )),
    )

    this.equipos$.pipe(
      map((equipos) => equipos.find(equipo => equipo.activo == this.route)),
      map((equipo)  => this.formBuilder.group({
            activo: [equipo!.activo, Validators.required],
            modelo: [equipo!.modelo],
            serie: [equipo!.serie],
            cliente: [equipo!.cliente],
            nombreLocal: [equipo!.nombreLocal],
            telefono: [equipo!.telefono, Validators.pattern(/^\d{8}$|^\d{4}\s\d{4}$|^\d{4}\-\d{4}$/)],
            direccion: [equipo!.direccion],
            encargado: [equipo!.encargado],
            fechaDeEntrega: [equipo!.fechaDeEntrega],
            ubicacion: [equipo!.ubicacion],
          })    
      ),
    ).subscribe((equipoForm) => this.nuevoEquipoForm = equipoForm);
  }

    
  public filtroClientes(value: string) {
    this.input.set(value);
  }

  public async actualizarEquipo() {
    this.isLoading = true;
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
    }
    try {
      await this.dataService.updateEquipo(this.route, nuevoEquipo);
      this.isLoading = false;
      this.toastr.success('Se ha editado correctamente','Guardado');
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
