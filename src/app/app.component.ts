import { Component } from '@angular/core';

// Angular Translate
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Varible tipo string para guardar los diferentes lenguajes
  langs: string[] = [];

  // Inicializar el servicio.
  constructor(private translate: TranslateService) {
    // Configuración por defecto es en ingles
    this.translate.setDefaultLang('en');
    // Usará la configuración en ingles.
    this.translate.use('en');

    // Trae el contenido actual del "Hello"
    // El get se lee una sola vez, para ser dinamico hay que hacerlo con stream
    this.translate.stream('HELLO')
    .subscribe((res: string) => {
      console.log(`Sin parametros: ${res}`);
      //=> 'Hello world'
      //=> 'Hola mundo'
    });

    // Lo mismo anterior pero con paramatros
    this.translate.stream('GREETING', {name: 'Kevin'})
    .subscribe((res: string) => {
      console.log(`Con parametros: ${res}`);
    });

    // Decirle cuales son los idiomas que se están soportando
    this.translate.addLangs(['en', 'es']);

    // Guardar en la variable Langs los lenguajes
    this.langs = this.translate.getLangs();
  }

  // Funcion que cambia lenguaje
  changeLang(lang: string) {
    this.translate.use(lang);
  }
}


