import { Equipo } from '../models/Equipo.model';
import { Local } from '../models/Local.model';
import { Mantenimiento } from '../interfaces/Mantenimiento.interface';

export class GetEquiposDto implements Equipo, Local {
  public modelo: string;
  public activo: string;
  public serie: string;
  public nombreLocal?: string;
  public telefono?: string;
  public direccion?: string;
  public encargado?: string;
  public fechaDeEntrega?: Date;
  public ubicacion?: string | undefined;
  public foto?: string | undefined;
  public mantenimientos?: Mantenimiento[];
  public proximoMantenimiento?: Date;
  constructor(
    modelo: string,
    activo: string,
    serie: string,
    nombreLocal: string,
    telefono: string,
    direccion: string,
    encargado: string,
    fechaDeEntrega: Date,
    proximoMantenimiento: Date,
    ubicacion?: string | undefined,
    foto?: string | undefined,
    mantenimientos?: Mantenimiento[],
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
    this.mantenimientos = mantenimientos;
    this.proximoMantenimiento = proximoMantenimiento;
  }
}
