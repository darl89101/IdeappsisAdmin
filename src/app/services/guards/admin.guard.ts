import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
    private router: Router) { }

  canActivate() {
    // return this.usuarioService.usuario.role === 'ADMIN_ROLE';
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('bloqueado por el ADMIN GUARD');
      this.usuarioService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
