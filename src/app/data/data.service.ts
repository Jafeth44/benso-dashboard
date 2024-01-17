import { Injectable, OnInit, inject } from '@angular/core';
import { DocumentData, Firestore, collection, doc, getDoc, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface EquipoNuevo {
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firestore: Firestore = inject(Firestore);
  private equipos: DocumentData[] = [];

  public async getData(): Promise<DocumentData[]> {
    const dataArray: DocumentData[] = [];
    const data = await getDocs(collection(this.firestore, "equipos"));
    data.forEach(docs => dataArray.push(docs.data()));
    return dataArray;
  }

  public get leerEquipos() {
    return this.equipos;
  }
}
