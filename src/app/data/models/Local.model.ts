export class Local {
  public id?: string;
  public cliente?: string;
  public nombreLocal?: string;
  public telefono?: string;
  public direccion?: string;
  public encargado?: string;
  public fechaDeEntrega?: Date;
  public ubicacion?: string;
  public fotoRef?: string;
  public foto?: string;
  constructor(
    id: string | undefined,
    cliente: string,
    nombreLocal: string,
    telefono: string,
    direccion: string,
    encargado: string,
    fechaDeEntrega: Date,
    ubicacion?: string,
    fotoRef?: string,
    foto?: string
  ) {
    this.id = id;
    this.cliente = cliente;
    this.nombreLocal = nombreLocal;
    this.telefono = telefono;
    this.direccion = direccion;
    this.encargado = encargado;
    this.fechaDeEntrega = fechaDeEntrega;
    this.ubicacion = ubicacion;
    this.fotoRef = fotoRef;
    this.foto = foto;
  }
}
