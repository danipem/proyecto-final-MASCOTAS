import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Importamos las clases de los componentes creados por nosotros
import { AplicacionComponent } from './componentes/raiz/aplicacion.component';
import { ErrorComponent } from './componentes/error/error.component';
import { InicioComponent } from './componentes/inicio/inicio.component';


const rutasApp: Routes = [

          {
            path: "inicio",
            component: InicioComponent
          },
          {
            path:"",
            redirectTo:"inicio",
            pathMatch:"full"},
          {
            path: "**",
            component: ErrorComponent
          }

]

@NgModule({
  //Declaramos los componentes creados
  declarations: [
    AplicacionComponent,
    ErrorComponent,
    InicioComponent
  ],
  //Importamos modulos internos
  imports: [
    BrowserModule,
    FormsModule, 
    RouterModule.forRoot(rutasApp,{enableTracing: true})
  ],
  providers: [],
  bootstrap: [AplicacionComponent]
})
export class AppModule {
  //Puede ser una clase vacia.
 }
