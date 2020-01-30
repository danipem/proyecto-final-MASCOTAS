import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {
  //usuarioNuevo: Usuario;
  //infoUsuarios: AlmacenUsuarios;
  
  constructor() { }

  registroComponentClick(): void{
    console.log('Click OK');

  

  }

  ngOnInit() {
  }

}
