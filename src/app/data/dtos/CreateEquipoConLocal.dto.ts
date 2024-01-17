import { Equipo } from '../models/Equipo.model';
import { Local } from '../models/Local.model';

export class CrearEquipoConLocalDto implements Equipo, Local {
  public modelo: string;
  public activo: number;
  public serie: string;
  public nombreLocal?: string;
  public telefono?: string;
  public direccion?: string;
  public encargado?: string;
  public fechaDeEntrega?: Date;
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
    ubicacion?: string | undefined,
    foto?: string | undefined
  ) {
    this.modelo = modelo;
    this.activo = activo;
    this.serie = serie;
    this.nombreLocal = nombreLocal;
    this.telefono = telefono;
    this.direccion = direccion;
    this.encargado = encargado;
    this.fechaDeEntrega = fechaDeEntrega;
    this.ubicacion = ubicacion;
    this.foto = foto;
  }
}
