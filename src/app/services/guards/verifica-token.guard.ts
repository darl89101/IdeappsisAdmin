import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

constructor(private usuarioService: UsuarioService,
  public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Verifica token Guard');
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);

    let expirado = this.expirado(payload.exp);
    if (expirado) {
      this.usuarioService.logout();
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            reject(false);
          });
      }
    });
  }

  expirado(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}