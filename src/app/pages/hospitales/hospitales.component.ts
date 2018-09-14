import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalHospitalService } from '../../components/modal-hospital/modal-hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  loading: boolean = true;
  totalRegistros: number = 0;
  hospitales: Hospital[] = [];
  desde: number = 0;

  constructor(public servicioHospitales: HospitalService,
    public modalHospitalService: ModalHospitalService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalHospitalService.notificaciones.subscribe(
      res => this.cargarHospitales()
    );
    this.modalUploadService.notificacion.subscribe(
      (res: any) => this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this.loading = true;
    this.servicioHospitales.cargarHospitales(this.desde)
      .subscribe((res: any) => {
        this.hospitales = res.hospitales;
        this.loading = false;
        this.totalRegistros = res.total;
      });
  }

  buscarHospital(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales();
      return;
    }
    this.servicioHospitales.buscarHospital(termino)
      .subscribe((res: Hospital[]) => {
        this.hospitales = res;
      });
  }

  mostrarModal(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  actualizarHospital(hospital: Hospital) {
    this.servicioHospitales.actualizarHospital(hospital)
      .subscribe(res => this.cargarHospitales());
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Estas seguro?',
      text: 'Eliminar hospital',
      icon: 'warning',
      buttons: ['NO', 'SI'],
      dangerMode: true
    }) .then((borrar) => {
      if (borrar) {
        this.servicioHospitales.borrarHospital(hospital._id)
          .subscribe(
            res => {
              this.cargarHospitales();
            }
          );
      } else {
        // swal('Your imaginary file is safe!');
      }
    });
  }

  AbrirModalHospital() {
    this.modalHospitalService.abrirModal();
  }

  cambiarDesde(incremento: number) {
    if (this.desde + incremento < 0 || this.desde + incremento >= this.totalRegistros) {
      return;
    }
    this.desde += incremento;
    this.cargarHospitales();
  }
}
