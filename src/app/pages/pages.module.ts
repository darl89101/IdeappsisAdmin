import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { RouterModule } from '@angular/router';
import { PAGE_ROUTES } from './pages.route';
import { SharedModule } from '../shared/shared.module';
// import { AppModule } from '../app.module';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

@NgModule({
    declarations: [
        ProgressComponent,
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(PAGE_ROUTES)
    ]
})
export class PagesModule { }
