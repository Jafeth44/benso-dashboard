import { Equipo } from '../models/Equipo.model';
import { Local } from '../models/Local.model';

export class GetEquiposLocalDto implements Equipo, Local {
  public equipoId?: string | undefined;
  public modelo: string;
  public activo: number;
  public serie: string;
  public localId?: string | undefined;
  public nombreLocal: string;
  public telefono: string;
  public direccion: string;
  public encargado: string;
  public fechaDeEntrega: Date;
  public ubicacion?: string | undefined;
  public foto?: string | undefined;

  constructor(
    modelo: string,
    activo: number,
    serie: string,
    nombreLocal: string,
    telefono: string,
    direccion: string,
    encargado: string,
    fechaDeEntrega: Date,
    localId?: string | undefined,
    equipoId?: string | undefined,
    ubicacion?: string | undefined,
    foto?: string | undefined
  ) {
    this.equipoId = equipoId;
    this.modelo = modelo;
    this.activo = activo;
    this.serie = serie;
    this.localId = localId;
    this.nombreLocal = nombreLocal;
    this.telefono = telefono;
    this.direccion = direccion;
    this.encargado = encargado;
    this.fechaDeEntrega = fechaDeEntrega;
    this.ubicacion = ubicacion;
    this.foto = foto;
  }
}