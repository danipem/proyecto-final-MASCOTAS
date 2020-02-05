import { Component, OnInit, Input } from '@angular/core';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass']
})
export class FormularioComponent{

  @Input() usuarioNuevo : UsuarioEnt;
  

}
