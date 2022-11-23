import { Component } from '@angular/core';
import { LenguageService } from '../services/lenguage.service';

@Component({
  selector: 'app-lenguaje',
  templateUrl: './lenguaje.component.html',
  styleUrls: ['./lenguaje.component.scss']
})
export class LenguajeComponent {

  langs : string[] = []

  constructor(private lenguajeService : LenguageService){
    this.langs = this.lenguajeService.langs;
  }


  changeLang (lang: string){
    this.lenguajeService.cambiar(lang);
  }
}