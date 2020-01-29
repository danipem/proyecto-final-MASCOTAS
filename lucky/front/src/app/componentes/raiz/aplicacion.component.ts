/***COMPONENTE RAIZ***/
import { Component } from "@angular/core";

@Component ({   //Objeto metadatos(caracteristicas)
    selector:'app-componente-raiz',
    template: ` <div class="container">
                    <div class="wrapper">
                        <div class="row">
                            <div class="col-sm">
                                <h1>{{titulo}}</h1>
                                    <router-outlet></router-outlet>
                                    </div>
                                </div>
                            </div>
                        </div>`


    //Caracteristicas (metadatos) 
})

export class AplicacionComponent{
    //Aqui los datos del UI y su funcionalidad, 
    //tambien se llama a esto modelo del componente
    titulo: string = "Gestion de Usuarios";
}