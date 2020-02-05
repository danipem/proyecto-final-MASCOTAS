import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { Animal } from 'src/app/entidades/animal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.sass']
})
export class AdopcionComponent implements OnInit {
 
  animal : Animal[]

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.obtenerTodosAnimales();
    this.animal = this.httpService.consigoAnimales();
  }

  redirige(id){
    this.router.navigate(["/perfil-animal/"+id]);
  }



}
