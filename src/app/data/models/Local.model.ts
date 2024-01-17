export class Local {
  public nombre: string;
  public telefono: string;
  public direccion: string;
  public encargado: string;
  public fechaDeEntrega: Date;
  public ubicacion?: string;
  public foto?: string;

  constructor(
    nombre: string,
    telefono: string,
    direccion: string,
    encargado: string,
    fechaDeEntrega: Date,
    ubicación?: string,
    foto?: string
  ) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.encargado = encargado;
    this.fechaDeEntrega = fechaDeEntrega;
    this.ubicacion = ubicación;
    this.foto = foto;
  }
}
