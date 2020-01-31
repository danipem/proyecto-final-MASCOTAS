import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-adoption',
  templateUrl: './home-adoption.component.html',
  styleUrls: ['./home-adoption.component.sass']
})
export class HomeAdoptionComponent implements OnInit {

  mensajeError: string = "Pagina no encontrada 404";

  constructor() { }

  ngOnInit() {
  }

}
