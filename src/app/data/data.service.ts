import { Injectable, inject } from '@angular/core';
import { Firestore, arrayUnion, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, catchError, combineLatest, first, map, of, take, tap } from 'rxjs';
import { CrearEquipoConLocalDto } from './dtos/CreateEquipoConLocal.dto';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { GetEquiposDto } from './dtos/GetEquipos.dto';
import { CrearMantenimientoDto } from './dtos/CrearMantenimiento.dto';
import { AuthService } from '../auth/auth.service';

export interface Administradores {
  name: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly storage = inject(Storage);
  private firestore: Firestore = inject(Firestore);
  private AuthService = inject(AuthService);
  public equipos$: Observable<GetEquiposDto[]>;
  public administradores$: Observable<Administradores[]>;
  public isAdmin$: Observable<boolean>;

  constructor() {
    const aCollection = collection(this.firestore, "equipos");
    const bCollection = collection(this.firestore, "administradores");
    this.equipos$ = collectionData(aCollection) as Observable<any[]>;
    this.administradores$ = collectionData(bCollection) as Observable<any[]>;
    this.isAdmin$ = combineLatest([
      this.AuthService.authState$,
      this.administradores$
    ]).pipe(
      map(([user, admins]) => admins.find(admin => admin.name == user?.email)),
      map(admin => admin ? true : false)
    )
  }

  public async crearEquipo(equipo: CrearEquipoConLocalDto) {
    const nuevoEquipo = Object.fromEntries(Object.entries(equipo).filter(([key, value]) => value != ""));
    await setDoc(doc(this.firestore, "equipos", equipo.activo.toString()), {...nuevoEquipo}, {merge: true});
  }

  public async updateEquipo(activo: string, equipo: CrearEquipoConLocalDto) {
    const updatedDoc = await updateDoc(doc(this.firestore, "equipos", activo), {...equipo})
    return updatedDoc;
  }
  
  public async subirImagen(input: HTMLInputElement): Promise<string[] | undefined> {
    if (!input.files?.item(0)) return undefined;
  
    const file = input.files[0];
    const storageRef = ref(this.storage, file.name);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return [file.name, imageUrl];
  }

  public async borrarImagen(fotoRef: string) {
    try {
      await deleteObject(ref(this.storage, fotoRef));
      return true;
    } catch (error) {
      return false;
    }
  }

  public async crearMantenimiento(activo: string, mantenimiento: CrearMantenimientoDto) {
    const updatedDoc = await updateDoc(doc(this.firestore, "equipos", activo), {
      mantenimientos: arrayUnion(mantenimiento)
    })
    return updatedDoc;
  }
}
