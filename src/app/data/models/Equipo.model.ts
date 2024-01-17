export class Equipo {
  public id?: string;
  public modelo: string;
  public activo: number;
  public serie: string;

  constructor(modelo: string, activo: number, serie: string) {
    this.modelo = modelo;
    this.activo = activo;
    this.serie = serie;
  }
}
