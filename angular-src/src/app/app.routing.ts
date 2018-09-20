import { ModuleWithProviders, Component } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';



    const appRoutes:Routes = [
        { path: '', loadChildren:'./pages/home/home.module#HomeModule'  }
    ]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});