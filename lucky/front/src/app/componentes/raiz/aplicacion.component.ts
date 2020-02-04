/***COMPONENTE RAIZ***/
import { Component } from "@angular/core";

@Component ({   //Objeto metadatos(caracteristicas)
    selector:'app-componente-raiz',
    template: `<div class="container"><div class="wrapper"><router-outlet></router-outlet></div></div>`,

    //Caracteristicas (metadatos) 
})

export class AplicacionComponent{
    //Aqui los datos del UI y su funcionalidad, 
    //tambien se llama a esto modelo del componente
    titulo: string = "Gestion de Usuarios";

}