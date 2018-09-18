import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UsuarioService,
    public route: Router) { }

  ngOnInit() {
  }

  buscar(termino: string) {
    this.route.navigate(['/busqueda', termino]);
  }

}
