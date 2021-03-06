import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  // menu: any[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Progressbar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RxJs', url: '/rxjs' }
  //     ]
  //   }, {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' }
  //     ]
  //   }
  // ];

  constructor(private usuarioService: UsuarioService) {
  }

  cargarMenu() {
    this.menu = this.usuarioService.menu;
    console.log(this.menu);
  }
}
