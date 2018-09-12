import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  URL_USUARIO = URL_SERVICIOS + '/usuario';
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient,
    private router: Router,
    public _subirArchivoService: SubirArchivoService) {
    this.loadStorage();
  }

  isAuthenticated(): boolean {
    return (this.token.length > 5);
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.URL_USUARIO, usuario)
    .pipe(
      map((res: any) => {
        swal('Usuario creado con éxito', res.usuario.email, 'success');
        return res.usuario;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
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

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(this.URL_USUARIO + '/' + usuario._id + '?token=' + this.token, usuario)
      .pipe(
        map((res: any) => {
          this.guardarDatosLogin(res.usuario._id, this.token, res.usuario, localStorage.getItem('email') !== undefined);
          swal('Importante', 'usuario actualizado correctamente', 'success');
          return res;
        })
      );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        console.log(res);
        this.usuario.img = res.usuario.img;
        this.guardarDatosLogin(id, this.token, this.usuario, localStorage.getItem('email') !== undefined);
        swal('Imagen actualizada', this.usuario.nombre, 'success');
      })
      .catch(err => {
        console.log(err);
      });
  }

}
