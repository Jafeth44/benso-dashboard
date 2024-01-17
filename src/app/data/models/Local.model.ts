export class Local {
  public id?: string;
  public nombreLocal?: string;
  public telefono?: string;
  public direccion?: string;
  public encargado?: string;
  public fechaDeEntrega?: Date;
  public ubicacion?: string;
  public foto?: string;
  constructor(
    id: string | undefined,
    nombreLocal: string,
    telefono: string,
    direccion: string,
    encargado: string,
    fechaDeEntrega: Date,
    ubicacion?: string,
    foto?: string
  ) {
    this.id = id;
    this.nombreLocal = nombreLocal;
    this.telefono = telefono;
    this.direccion = direccion;
    this.encargado = encargado;
    this.fechaDeEntrega = fechaDeEntrega;
    this.ubicacion = ubicacion;
    this.foto = foto;
  }
}
