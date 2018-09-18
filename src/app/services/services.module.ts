import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  AdminGuard,
  VerificaTokenGuard
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { ModalHospitalService } from '../components/modal-hospital/modal-hospital.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    ModalHospitalService,
    MedicoService,

    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServicesModule { }
