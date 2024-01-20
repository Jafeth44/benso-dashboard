import { Materiales } from './Materiales.interface';
import { Repuestos } from './Respuestos.interface';

export interface Mantenimiento {
  fecha: Date;
  horaInicio: Date;
  horaCierre: Date;
  detalle: string;
  observaciones: string;
  materiales: Materiales;
  respuestos: Repuestos;
}