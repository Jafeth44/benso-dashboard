export class Equipo {
  public activo: string;
  public modelo?: string;
  public serie?: string;

  constructor(
    activo: string, 
    modelo?: string, 
    serie?: string
    ) {
    this.modelo = modelo;
    this.activo = activo;
    this.serie = serie;
  }
}
