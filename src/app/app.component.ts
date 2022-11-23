import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /*
    Para cambiar la ruta de mi pagina dependiendo del lenguaje que este seleccionado sin cambiar de pagina 
    Ejemplo: localhost:4200/en/ o localhost:4200/es/

    1. Agregar en el app-routing.module.ts
      import { Routes, RouterModule } from '@angular/router';
      import { HomeComponent } from './home/home.component';
    2. Agregar en el approutingmodule.ts
      const routes: Routes = [
        {
          path: ':lang',
          component: HomeComponent,
          children: [
            {
              path: 'tasks,
              component: TasksComponent
            }
          ]
        },
        {
          path: '',
          // Redirecto al lang actual
          redirectTo: `/${localStorage.getItem('lang')}`,
          pathMatch: 'full',
        },
      ];
    3. Agregar en el app.component.html
      <router-outlet></router-outlet>
    4. Agregar en el app.component.ts
      import { ActivatedRoute } from '@angular/router';
      constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
          this.translate.use(params.lang);;
        });
      }
    5. Agregar en el changeLang de app.component.ts
      this.router.navigate([lang]);
      Para que funcione router.navigate:
       1. Agregar en el app-routing.module.ts
        import { RouterModule } from '@angular/router;
      2. Tambien en lenguaje.component.ts
       import { Router } from '@angukar/router';
      3. En el contrusctor del lenguaje.compoentn.ts
       constructor( priva)
    
  */
}
