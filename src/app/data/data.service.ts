import { Injectable, OnInit, inject } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CrearEquipoConLocalDto } from './dtos/CreateEquipoConLocal.dto';

export interface EquipoNuevo {
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore: Firestore = inject(Firestore);
  private equipo$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, "equipos");
    this.equipo$ = collectionData(aCollection) as Observable<any[]>;
  }

  public async crearEquipo(equipo: CrearEquipoConLocalDto) {
    const newDoc = await setDoc(doc(this.firestore, "equipos", equipo.activo.toString()), equipo);
    return newDoc;
  }

  public get todosLosEquipos() {
    return this.equipo$;
  }
}
