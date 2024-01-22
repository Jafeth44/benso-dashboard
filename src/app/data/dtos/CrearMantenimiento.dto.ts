import { Mantenimiento } from "../interfaces/Mantenimiento.interface";
import { Materiales } from "../interfaces/Materiales.interface";
import { Repuestos } from "../interfaces/Respuestos.interface";

export class CrearMantenimientoDto implements Mantenimiento {
  public fecha: Date;
  public horaInicio: Date;
  public horaCierre: Date;
  public tecnico: string;
  public detalle: string;
  public observaciones: string;
  public materiales: Materiales;
  public repuestos: Repuestos;

  constructor(
    fecha: Date,
    horaInicio: Date,
    horaCierre: Date,
    tecnico: string,
    detalle: string,
    observaciones: string,
    materiales: Materiales,
    respuestos: Repuestos,
  ) {
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaCierre = horaCierre;
    this.tecnico = tecnico;
    this.detalle = detalle;
    this.observaciones = observaciones;
    this.materiales = materiales;
    this.repuestos = respuestos;
  }
}