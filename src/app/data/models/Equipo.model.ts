export class Equipo {
  public id?: string;
  public modelo: string;
  public activo: string;
  public serie: string;

  constructor(modelo: string, activo: string, serie: string) {
    this.modelo = modelo;
    this.activo = activo;
    this.serie = serie;
  }
}
