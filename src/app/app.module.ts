import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Translate (Dependencias)
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home/home.component';
import { LenguajeComponent } from './lenguaje/lenguaje.component';
import { Pagina2Component } from './pagina2/pagina2.component';

// Teoria AOT es la forma en que angular no entrega compilación de alto nivel, nos ayuda a optimizar.

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LenguajeComponent,
    Pagina2Component
  ],
  imports: [
    BrowserModule,
    // Angular Translate
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Funcion exportable para no tener conflictos
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}