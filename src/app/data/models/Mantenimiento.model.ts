import { Materiales } from '../interfaces/Materiales.interface';
import { Repuestos } from '../interfaces/Respuestos.interface';

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

const mantenimiento = new Mantenimiento(
  new Date,
  new Date,
  new Date,
  'caca',
  'caca',
  {
    nitrogeno: true,
    nuBrite: true,
    refrigerante: true,
    soldadura: true,
    tuberiaCobre: true 
  },
  {
    abanicoAxial: true,
    abanicoCondensador: true,
    abanicoEvaporador: true,
    capacitorArranque: true,
    capacitorPermanente: true,
    capilar: true,
    compresor: true,
    contactor: true,
    controlador: true,
    empaquePuerta: true,
    filtroDeshidratador: true,
    fusibles: true,
    interruptorLuz: true,
    manillas: true,
    protectorTermico: true,
    pushBoton: true,
    relay: true,
    resistenciaDrenaje: true,
    resistenciaEvaporador: true,
    resistenciaPuerta: true,
    sensor: true,
    tuboLedGrande: true,
    tuboLedPequeno: true,
    valvulaCarga: true,
    vidrioPuertas: true,
  }
);
