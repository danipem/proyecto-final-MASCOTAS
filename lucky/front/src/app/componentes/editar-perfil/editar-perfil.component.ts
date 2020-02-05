import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.sass']
})
export class EditarPerfilComponent implements OnInit {
  
  usuarioEditado: UsuarioEnt
  usuario: UsuarioEnt
  constructor(private infUsu: HttpService, private route: Router){ }

  ngOnInit() {
    
    this.usuarioEditado= this.infUsu.obtenerUsuario();

  }

  editComponent(){

    this.infUsu.modificarUsuario(this.usuarioEditado);

    this.usuarioEditado = this.infUsu.obtenerUsuario();
    
    this.route.navigate(["/home"]);
    
  }

}
