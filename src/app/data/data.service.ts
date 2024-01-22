import { Injectable, inject } from '@angular/core';
import { Firestore, arrayUnion, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, catchError, map, of } from 'rxjs';
import { CrearEquipoConLocalDto } from './dtos/CreateEquipoConLocal.dto';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { GetEquiposDto } from './dtos/GetEquipos.dto';
import { CrearMantenimientoDto } from './dtos/CrearMantenimiento.dto';

export interface EquipoNuevo {
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly storage = inject(Storage);
  private firestore: Firestore = inject(Firestore);
  public equipo$: Observable<GetEquiposDto[]>;

  constructor() {
    const aCollection = collection(this.firestore, "equipos");
    this.equipo$ = collectionData(aCollection) as Observable<any[]>;
  }

  public async crearEquipo(equipo: CrearEquipoConLocalDto) {
    const newDoc = await setDoc(doc(this.firestore, "equipos", equipo.activo.toString()), equipo);
    return newDoc;
  }
  
  public async subirImagen(input: HTMLInputElement): Promise<string | undefined> {
    if (!input.files?.item(0)) return undefined;

    const file = input.files[0];
    const storageRef = ref(this.storage, file.name);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  }

  //todo crear dto de nuevo mantenimiento
  public async crearMantenimiento(activo: string, mantenimiento: CrearMantenimientoDto) {
    const updatedDoc = await updateDoc(doc(this.firestore, "equipos", activo), {
      mantenimientos: arrayUnion(mantenimiento)
    })
    return updatedDoc;
  }
}
