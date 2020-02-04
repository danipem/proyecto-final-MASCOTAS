import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../../entidades/animal'
import { HttpService } from '../../servicios/http.service';

@Component({
  selector: 'app-perfil-animal',
  templateUrl: './perfil-animal.component.html',
  styleUrls: ['./perfil-animal.component.sass']
})
export class PerfilAnimalComponent implements OnInit {

  @Input() perfilAnimal: Animal;

  constructor(private infAnimal: HttpService) {
    this.perfilAnimal=new Animal()
  
   }

   
   
  ngOnInit() {
    alert( this.perfilAnimal.id)
  }

  cargaDatos(){
    this.infAnimal.obtenerAnimal(this.perfilAnimal.id);
    this.perfilAnimal = this.infAnimal.consigoAnimal();
    return this.perfilAnimal
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
