import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        let termino = params['termino'];
        this.buscar(termino);
      }
    );
  }

  buscar(termino: string) {
    this.http.get(URL_SERVICIOS + `/busqueda/todo/${termino}`)
      .subscribe((res: any) => {
        this.hospitales = res.hospitales;
        this.medicos = res.medicos;
        this.usuarios = res.usuarios;
      });
  }

}
