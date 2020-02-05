import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.sass']
})
export class FiltrosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("tipo").setAttribute("style", "display: none");
  }

  // muestraAlgo(){
    
  //   const animal = event.currentTarget.dataset.tipo;
    

  //   switch(animal){
  //     case "perro":
  //       document.getElementById(animal).setAttribute("src", "../../../assets/iconos/perrop_2.png");
  //       document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
  //       document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
  //       document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
  //       this.escribeTitulo(animal);
  //       break;
  //     case "gato":
  //       document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
  //       document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
  //       document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
  //       document.getElementById(animal).setAttribute("src", "../../../assets/iconos/cat_2.png");
  //       this.escribeTitulo(animal);
  //       break;
  //     case "conejo":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "cobaya":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "mamifero":
  //       document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
  //       document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
  //       document.getElementById(animal).setAttribute("src", "../../../assets/iconos/035CoatiCopy_2.png");
  //       document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
  //       this.escribeTitulo(animal);
  //       break;
  //     case "huron":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "pez":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "reptil":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "anfibio":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "aracnido":
  //       this.escribeTitulo(animal);
  //       break;
  //     case "ave":
  //       document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
  //       document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
  //       document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
  //       document.getElementById(animal).setAttribute("src", "../../../assets/iconos/aveRoja.png");
  //       this.escribeTitulo(animal);
  //       break;
  //   }
  //   //console.log(animal.dataset.tipo);
    
    
  // }

  escribeTitulo(animal){
    document.getElementById("tipo").setAttribute("style", "display: block");
    document.getElementById("tipoTitulo").innerText = "Tipo de "+animal;
  }
}
