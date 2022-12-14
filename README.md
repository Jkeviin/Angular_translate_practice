# EXPLICACIÓN :sunglasses:

> Curso de referencia: [App con múltiples idiomas usando ngx-translate con Angular](https://www.youtube.com/watch?v=bVIH8f0Oyv0&ab_channel=nicobytes)

Instalar en CLI `Angular Translate`.

```console
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```
#

Importar Dependencias de Angular Translate en `app.module.ts`.

```typescript
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
````
#

Crear función exportable para no tener conflictos con AOT (compilación de alto nivel) en `app.module.ts`.

```typescript
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
```
#

Configuración para que Angular Translate quede funcionando bien, se pone igualmente en `app.module.ts`, se pone dentro `imports: []`.

```typescript
HttpClientModule,
TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }
})
```
#

Importar *Servicio* de Angular Translate en `app.component.ts`

```typescript
import {TranslateService} from '@ngx-translate/core';
```

Se le agrega un constructor en el export class AppComponent de `app.component.ts`

```typescript
export class AppComponent {
  // Inicializar el servicio.
  constructor(private translate: TranslateService) {
    // Configuración por defecto es en ingles
    this.translate.setDefaultLang('en');
    // Usará la configuración en ingles.
    this.translate.use('en');
  }
}
```
#

Se debe crear los archivos donde estarán los diferentes lenguajes de texto.

1. Se dirige a la carpeta carpeta `assets`.
2. Dentro, se crea otra carpeta llamada `i18n`.
3. Se crean los diferentes tipos de lenguaje en archivos `JSON`.

En este caso español e ingles:

`en.json`
```json
{
  "HELLO": "Hello world"
}
```

`es.json`
```json
{
  "HELLO": "Hola mundo"
}
```
#

Para probarlo, en el HTML `app.component.html` se agrega la siguiente sintaxis:

```html
<h1>{{ 'HELLO' | translate }}</h1>
```

Se verá *HELLO* de .json dependiendo el lenguaje que esté selencionado.
#

Con el siguiente codigo se puede llamar el contenido del atributo del objeto.
Dentro *app.component.ts*, en el `controlador` se pone dentro del `constructor() { AQUI }`

```typescript
    // El get se lee una sola vez, para ser dinamico hay que hacerlo con stream
    this.translate.stream('HELLO')
    .subscribe((res: string) => {
      console.log(`Sin parametros: ${res}`);
      //=> 'Hello world'
      //=> 'Hola mundo'
    });
```
#

Para comenzar a hacer **dinamico**, se debe agregar `addLangs` y `getLangs` dentro del constructor y crear una variable de tipo arreglo para guardar el contenido.

```typescript
export class AppComponent {

  // Varible tipo string para guardar los diferentes lenguajes
  langs: string[] = [];
  
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    
    // Decirle cuales son los idiomas que se están soportando
    this.translate.addLangs(['en', 'es']);

    // Guardar en la variable Langs los lenguajes
    this.langs = this.translate.getLangs();
  }
  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
```
#

En el HTML, se agrega un select para poder *manipular* el lenguaje de la pagina. 
Se agrega una `evento Change` y un `*ngFor` para poder traer como *opciones* todos los lenguajes.

````html
<label>
  change
  <select #langSelect (change)="changeLang(langSelect.value)">
    <option *ngFor="let lang of langs" [value]="lang">
      {{ lang }}
    </option>
  </select>
</label>
````
#

Para poner un texto traducido con `parametros`, se debe poner el siguiente codigo:

```html
<h3>{{ 'GREETING' | translate:{name:'Kevin'} }}</h3>
```
*name* sería el parametro que se envía al `JSON` del lenguaje actual
#

En los JSON se les agrega el siguiente codigo:

```json
// en.json
"GREETING": "Hello {{name}}, nice to meet you."
// es.json
"GREETING": "Hola {{name}}, un gusto conocerte."
```
El `{{name}}` seria el parametro que recibe.

#

Con el siguiente codigo se puede llamar el contenido del atributo del objeto con **ATRIBUTOS**.
Dentro *app.component.ts*, en el `controlador` se pone dentro del `constructor() { AQUI }`

```typescript
this.translate.stream('GREETING', {name: 'Kevin'})
.subscribe((res: string) => {
  console.log(res);
});
```
#

Para hacer contenido Html como un `<strong>` se puede agregar asi normalmente en el JSON.

```json
// en.json
"GREETING": "Hello  <strong>{{name}}</strong>, nice to meet you.",
// es.json
"GREETING": "Hola <strong>{{name}}</strong>, un gusto conocerte."
```
#

Pero, se debe agregar esto en el html para que lo reciba como algo de html.
```html
<div [innerHTML]="'GREETING' | translate:{name: 'Kevin'}"></div>
```
#

GRACIAS POR LLEGAR HASTA AQUI, ESPERO LES HAYA SERVIDO.
