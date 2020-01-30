import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  clickIniciarSesion(): void{
    console.log('Click OK')

  }
  clickCrearUsuario():void{
    console.log(('Ese clickeo bueno'));
    
  }

}
