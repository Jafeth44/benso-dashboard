import { Component, Input, inject, signal } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendar-mantenimieto',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './agendar-mantenimieto.component.html',
  styles: ``
})
export class AgendarMantenimientoComponent {
  private fireStore = inject(Firestore);

  @Input({required: true})
  public activo!: string;

  public isLoading: boolean = false;
  public fecha = signal('');
  public invalid = true;

  public async agendarMantenimiento() {
    this.isLoading = true;
    await updateDoc(doc(this.fireStore, "equipos", this.activo), {
      proximoMantenimiento: this.fecha()
    })
    this.isLoading = false;
    return;
  }
}
