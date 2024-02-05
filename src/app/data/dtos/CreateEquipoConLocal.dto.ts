import { Equipo } from '../models/Equipo.model';
import { Local } from '../models/Local.model';

export class CrearEquipoConLocalDto implements Equipo, Local {
  public activo: string;
  public modelo?: string;
  public serie?: string;
  public cliente?: string | undefined;
  public nombreLocal?: string;
  public telefono?: string;
  public direccion?: string;
  public encargado?: string;
  public fechaDeEntrega?: Date | string;
  public ubicacion?: string | undefined;
  public fotoRef?: string | undefined;
  public foto?: string | undefined;
  public proximoMantenimiento?: string | undefined;
  constructor(
    modelo: string,
    activo: string,
    serie: string,
    cliente: string,
    nombreLocal: string,
    telefono: string,
    direccion: string,
    encargado: string,
    fechaDeEntrega: Date,
    ubicacion?: string | undefined,
    fotoRef?: string | undefined,
    foto?: string | undefined,
    proximoMantenimiento?: string | undefined
  ) {
    this.modelo = modelo;
    this.activo = activo;
    this.serie = serie;
    this.cliente = cliente;
    this.nombreLocal = nombreLocal;
    this.telefono = telefono;
    this.direccion = direccion;
    this.encargado = encargado;
    this.fechaDeEntrega = fechaDeEntrega;
    this.ubicacion = ubicacion;
    this.fotoRef = fotoRef;
    this.foto = foto;
    this.proximoMantenimiento = proximoMantenimiento
  }
}
