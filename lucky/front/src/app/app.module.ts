import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

//Importamos las clases de los componentes creados por nosotros
import { AplicacionComponent } from './componentes/raiz/aplicacion.component';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FiltrosComponent } from './componentes/filtros/filtros.component';


const rutasApp: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },

  {
    path: "inicio",
    component: InicioComponent
  },
  {
    path: "filtros",
    component: FiltrosComponent
  },
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: "full"
  },
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
    LoginComponent,
    InicioComponent,
    RegistroComponent,
    FiltrosComponent
  ],
  //Importamos modulos internos
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutasApp, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AplicacionComponent]
})
export class AppModule {
  //Puede ser una clase vacia.
}
