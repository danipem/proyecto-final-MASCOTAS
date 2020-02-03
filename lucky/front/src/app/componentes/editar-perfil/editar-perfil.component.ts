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
  usuario: UsuarioEnt[]
  constructor(private infUsu: HttpService ){ }

  ngOnInit() {
    this.prueba();
    

  }

  prueba(){
    
    this.usuario= this.infUsu.listLocalStrg();
    this.usuarioEditado.nombre = this.usuario[0].nombre;
    this.usuarioEditado.password = this.usuario[0].password;
    this.usuarioEditado.email = this.usuario[0].email;
    console.log(this.usuario[0].nombre);
  }

}
