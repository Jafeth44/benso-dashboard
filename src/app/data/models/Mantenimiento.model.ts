import { Materiales } from "../interfaces/Materiales.interface";
import { Repuestos } from "../interfaces/Respuestos.interface";

export class Mantenimiento {
  constructor(
    public fecha: Date,
    public horaInicio: Date,
    public horaCierre: Date,
    public detalle: string,
    public observaciones: string,
    public materiales: Materiales,
    public respuestos: Repuestos
  ) {}
}