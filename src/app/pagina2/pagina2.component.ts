import { Component, OnInit } from '@angular/core';
import { LenguageService } from '../services/lenguage.service';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.scss']
})
export class Pagina2Component implements OnInit {

  constructor(private lenguajeService: LenguageService) {}

  ngOnInit(): void {
  }

}
