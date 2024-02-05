import { Component, inject } from '@angular/core';
import { DataService } from '../../data/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './subir-equipos.component.html',
  styles: ``
})
export class SubirEquiposComponent {
  private dataService = inject(DataService);
  private toastr = inject(ToastrService);

  public data = [
    {
      "fechaDeEntrega": "20/11/2023",
      "modelo": "CV-24-PVPB",
      "activo": "332",
      "serie": "51871",
      "direccion": "CARTAGO, CACHI, 50 METROS SUR DE LA IGLESIA CATOLICA, CACHI CENTRO",
      "nombreLocal": "SUPERMERCADO LUNA",
      "telefono": "8710 0888",
      "encargado": "XIAOZHEN WU",
      "ubicacion": "https://www.google.com/maps/place/Supermercado+Luna/@9.8249044,-83.8032318,20z/data=!4m12!1m5!3m4!2zOcKwNDknMjkuNyJOIDgzwrA0OCcxMC41Ilc!8m2!3d9.8249044!4d-83.8029099!3m5!1s0x8fa1279faffed99f:0xcb65eb3701df0d7d!8m2!3d9.8246822!4d-83.8029319!16s%2Fg%2F1hf2v0df9?hl=es&entry=ttu",
      "cliente": "DISVAL S.A."
    },
    {
      "fechaDeEntrega": "21/11/2023",
      "modelo": "CV-24-PVPB",
      "activo": "331",
      "serie": "51863",
      "direccion": "CAÑAS, 100 METROS SUR DEL SUPER COMPRO CAÑAS",
      "nombreLocal": "SUPER ECONOMICO",
      "telefono": "4709 7806",
      "encargado": "MARIO",
      "ubicacion": "https://www.google.com/maps/place/10%C2%B025'33.1%22N+85%C2%B005'37.0%22W/@10.4258575,-85.0961952,17z/data=!3m1!4b1!4m4!3m3!8m2!3d10.4258575!4d-85.0936203?hl=es&entry=ttu",
      "cliente": "DISVAL S.A."
    },
    {
      "fechaDeEntrega": "30/11/2023",
      "modelo": "CV-24-PVPB",
      "activo": "336",
      "serie": "51878",
      "direccion": "HEREDIA, SANTO DOMINGO CENTRO, A UN COSTADO DE GOLLO",
      "nombreLocal": "SUPER IRAZU",
      "telefono": "6160 7632",
      "encargado": "ALEX FENG",
      "ubicacion": "https://www.google.com/maps/place/S%C3%BAper+Irazu/@9.9797108,-84.0894876,21z/data=!4m14!1m7!3m6!1s0x8fa0e56a17eb654f:0x2db3dcd5d36b0800!2sS%C3%BAper+Irazu!8m2!3d9.9798482!4d-84.0893555!16s%2Fg%2F11ghq3k0yt!3m5!1s0x8fa0e56a17eb654f:0x2db3dcd5d36b0800!8m2!3d9.9798482!4d-84.0893555!16s%2Fg%2F11ghq3k0yt?authuser=0&entry=ttu",
      "cliente": "DISVAL S.A."
    },
    {
      "fechaDeEntrega": "06/12/2023",
      "modelo": "CV-24-PVPB",
      "activo": "339",
      "serie": "51874",
      "direccion": "CAJON PEREZ ZELEDON, CALLE PRINCIPAL",
      "nombreLocal": "SUPER DRAGON",
      "telefono": "89448880",
      "encargado": "YU WU YUQUAN",
      "ubicacion": "https://www.google.com/maps/place/9%C2%B017'10.3%22N+83%C2%B036'11.9%22W/@9.2862581,-83.6035474,20z/data=!4m4!3m3!8m2!3d9.2861919!4d-83.603302?hl=es&entry=ttu",
      "cliente": "DISVAL S.A."
    },
    {
      "fechaDeEntrega": "",
      "modelo": "CV-24-PVPB",
      "activo": "553",
      "serie": "",
      "direccion": "PALMARES, ESQUIPULAS, DIAGONAL AL BAR ESQUINA DE QUILLO",
      "nombreLocal": "",
      "telefono": "",
      "encargado": "",
      "ubicacion": "",
      "cliente": "DISVAL S.A."
    }
  ]

  public async subirDeUnoEnUno() {
    this.data.forEach(equipo => {
      equipo.fechaDeEntrega = equipo.fechaDeEntrega.replaceAll("/", "-").split('-').reverse().join('-');
      equipo.telefono = equipo.telefono.replace(' ', '');
      this.dataService.crearEquipo(equipo)
      this.toastr.success("se han subido los equipos correctamente");
    })
  }
}
