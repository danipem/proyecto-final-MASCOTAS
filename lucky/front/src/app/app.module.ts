import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Importamos las clases de los componentes creados por nosotros
import { AplicacionComponent } from './componentes/raiz/aplicacion.component';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';


const rutasApp: Routes = [
          {
          path: "login",
          component: LoginComponent
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
    LoginComponent
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
