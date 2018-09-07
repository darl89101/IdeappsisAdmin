import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  URL_USUARIO = URL_SERVICIOS + '/usuario';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.URL_USUARIO, usuario)
    .pipe(
      map((res: any) => {
        swal('Usuario creado con éxito', res.usuario.email, 'success');
        return res.usuario;
      })
    );
  }

}
