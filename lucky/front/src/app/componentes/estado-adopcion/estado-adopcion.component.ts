import { Component, OnInit } from '@angular/core';
import { Animal } from '../../entidades/animal';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';
import { Adopcion } from 'src/app/entidades/adopcion';

@Component({
  selector: 'app-estado-adopcion',
  templateUrl: './estado-adopcion.component.html',
  styleUrls: ['./estado-adopcion.component.sass']
})
export class EstadoAdopcionComponent implements OnInit {

  animal: Animal[];
  adopcion: Adopcion[];
  usuario: String;

  constructor(private httpService: HttpService) {
    this.usuario = this.httpService.obtenerUsuario()._id;
  }

  ngOnInit() {

    this.httpService.obtenerSolicitudesAdopciones(this.usuario);
    this.adopcion = this.httpService.consigoSolicitudes();

  }

}
