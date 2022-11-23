import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LenguageService {
  // Varible tipo string para guardar los diferentes lenguajes
  langs: string[] = [];

  // Variable que guarda el lenguaje del navegador
  navegador: string = ''!;

  // Inicializar el servicio.
  constructor(private translate: TranslateService) {
    // Agregar el lenguaje que tiene el navegador con condicionales
    localStorage.getItem('lang') == null
      ? (this.navegador = navigator.language.split('-')[0])
      : (this.navegador = localStorage.getItem('lang')!);

    // Seteamos en localStorage el lenguaje
    localStorage.setItem('lang', this.navegador);

    // Configuración por defecto es en ingles
    this.translate.setDefaultLang(this.navegador);

    // Usará la configuración en ingles.
    this.translate.use(this.navegador);

    // Trae el contenido actual del "Hello"
    // El get se lee una sola vez, para ser dinamico hay que hacerlo con stream
    this.translate
      .stream('HELLO')
      .subscribe((res: string) => {
        console.log(`Sin parametros: ${res}`);
        //=> 'Hello world'
        //=> 'Hola mundo'
      })
      .unsubscribe();

    // Lo mismo anterior pero con paramatros
    this.translate
      .stream('GREETING', { name: 'Kevin' })
      .subscribe((res: string) => {
        console.log(`Con parametros: ${res}`);
      })
      .unsubscribe();

    /* 
      En los casos que un subscribe podrian ser los siguiente:
      1. Cuando se quiere hacer una peticion http y se quiere mostrar un mensaje de cargando
      2. Cuando se quiere mostrar un mensajes de informacion en un formulario, ejemplo:
        - El campo nombre es requerido
        - El campo nombre debe tener minimo 3 caracteres
    */

    // Decirle cuales son los idiomas que se están soportando
    this.translate.addLangs(['en', 'es']);

    // Guardar en la variable Langs los lenguajes
    this.langs = this.translate.getLangs();

    // Poner el Langs que este por defecto de primero en el arreglo
    this.langs.splice(this.langs.indexOf(this.navegador), 1); // Eliminar el lenguaje actual
    this.langs.unshift(this.navegador); // Agregar el lenguaje actual al inicio del arreglo
  }

  // Funcion que cambia lenguaje
  cambiar(lang: string) {
    // Cambiar el lenguaje
    this.translate.use(lang);

    // Guardamos el lenguaje en localStorage
    localStorage.setItem('lang', lang);
  }
}
