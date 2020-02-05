import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../../entidades/animal';
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-animal',
  templateUrl: './perfil-animal.component.html',
  styleUrls: ['./perfil-animal.component.sass']
})
export class PerfilAnimalComponent implements OnInit {

  perfilAnimal: Animal
  urlTree ;
  arrayRuta;
  obtenRuta;
  id : String;

  constructor(private infAnimal: HttpService, private router: Router) {

    this.urlTree = this.router.parseUrl(this.router.url);
    this.arrayRuta = new Array();
    this.obtenRuta = "";
   }



  ngOnInit() {
    this.obtenRuta = ""+this.urlTree
    this.arrayRuta = new Array();
    this.arrayRuta = this.obtenRuta.split("/")
    this.id = this.arrayRuta[2];
    this.infAnimal.obtenerAnimal(this.id);
    this.perfilAnimal = this.infAnimal.consigoAnimal()
    //alert(this.cargaAnimal());
  }

  cargaAnimal(){
    this.infAnimal.obtenerAnimal(this.id);
    this.perfilAnimal = this.infAnimal.consigoAnimal()
    return this.perfilAnimal;
  }

  oculta1(){
    const pagina1 = document.getElementById("animal-datos")
    pagina1.setAttribute("style", "display: block");

    const pagina2 = document.getElementById("animal-salud")
    pagina2.setAttribute("style", "display: none");

    const pagina3 = document.getElementById("animal-adopcion")
    pagina3.setAttribute("style", "display: none");

    const pestana = document.getElementById("pestana-datos")
    pestana.setAttribute("style", "font-weight: bold; color: rgb(1,116,142); border-bottom: 2px solid rgb(250,156,147)")

    const pestana2 = document.getElementById("pestana-salud")
    pestana2.setAttribute("style", "font-weight: medium; color: black")

    const pestana3 = document.getElementById("pestana-adopcion")
    pestana3.setAttribute("style", "font-weight: medium; color: black")
  }

  oculta2(){
    const pagina1 = document.getElementById("animal-datos")
    pagina1.setAttribute("style", "display: none");

    const pagina2 = document.getElementById("animal-salud")
    pagina2.setAttribute("style", "display: block");

    const pagina3 = document.getElementById("animal-adopcion")
    pagina3.setAttribute("style", "display: none");

    const pestana = document.getElementById("pestana-salud")
    pestana.setAttribute("style", "font-weight: bold; color: rgb(1,116,142); border-bottom: 2px solid rgb(250,156,147)")

    const pestana2 = document.getElementById("pestana-datos")
    pestana2.setAttribute("style", "font-weight: 400; color: black; border: none")

    const pestana3 = document.getElementById("pestana-adopcion")
    pestana3.setAttribute("style", "font-weight: medium; color: black")

  }
  oculta3(){
    const pagina1 = document.getElementById("animal-datos")
    pagina1.setAttribute("style", "display: none");

    const pagina2 = document.getElementById("animal-salud")
    pagina2.setAttribute("style", "display: none");

    const pagina3 = document.getElementById("animal-adopcion")
    pagina3.setAttribute("style", "display: block");

    const pestana = document.getElementById("pestana-adopcion")
    pestana.setAttribute("style", "font-weight: bold; color: rgb(1,116,142); border-bottom: 2px solid rgb(250,156,147)")

    const pestana2 = document.getElementById("pestana-salud")
    pestana2.setAttribute("style", "font-weight: medium; color: black")

    const pestana3 = document.getElementById("pestana-datos")
    pestana3.setAttribute("style", "font-weight: 400; color: black; border: none")
  }

}
