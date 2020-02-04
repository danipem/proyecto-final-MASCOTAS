import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.sass']
})
export class EditarPerfilComponent implements OnInit {
  
  usuarioEditado: UsuarioEnt
  usuario: UsuarioEnt
  constructor(private infUsu: HttpService ){ }

  ngOnInit() {
    this.prueba();
    console.log(this.infUsu.obtenerUsuario);

  }

  prueba(){
    
    this.usuarioEditado= this.infUsu.obtenerUsuario();
    

  }

}
