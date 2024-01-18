import { Injectable, OnInit, inject } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CrearEquipoConLocalDto } from './dtos/CreateEquipoConLocal.dto';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { uploadBytesResumable } from 'firebase/storage';

export interface EquipoNuevo {
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly storage = inject(Storage);
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
  
  public async subirImagen(input: HTMLInputElement) {
    if (!input.files) {
      console.log('no llego la imagen');
      return;
    }
    const file = input.files[0];
    const storageRef = ref(this.storage, file.name);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  }
}
