import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  URL_USUARIO = URL_SERVICIOS + '/usuario';
  usuario: Usuario;
  token: string;

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

  login(usuario: Usuario, recordar: boolean = false) {
    return this.http.post(URL_SERVICIOS + '/login', usuario)
      .pipe(
        map((res: any) => {
          // localStorage.setItem('id', res.id);
          // localStorage.setItem('token', res.token);
          // localStorage.setItem('usuario', JSON.stringify(res.usuario));
          // if (recordar) {
          //   localStorage.setItem('email', usuario.email);
          // } else {
          //   localStorage.removeItem('email');
          // }
          this.guardarDatosLogin(res.id, res.token, res.usuario, recordar);
          return true;

        })
      );
  }

  googleLogin(token: string) {
    return this.http.post(URL_SERVICIOS + '/login/google', { token })
      .pipe(
        map((res: any) => {
          console.log(res);
          this.guardarDatosLogin(res.id, res.token, res.usuario);
          return true;
        })
      );
  }

  guardarDatosLogin(id: string, token: string, usuario: Usuario, recordar: boolean = false) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    this.usuario = usuario;
    this.token = token;
  }

}
