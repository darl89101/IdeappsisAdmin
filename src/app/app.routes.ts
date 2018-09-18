import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

export const appRoutes: Routes = [
    // {
    //     path: '',
    //     loadChildren: 'app/pages/pages.module#PagesModule'
    //     // component: PagesComponent,
    //     // children: [
    //     //     { path: 'dashboard', component: DashboardComponent },
    //     //     { path: 'progress', component: ProgressComponent },
    //     //     { path: 'graficas1', component: Graficas1Component },
    //     //     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    //     // ]
    // },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent }
];
