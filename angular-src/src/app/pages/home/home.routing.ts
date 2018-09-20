
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home.component';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';
    
    const appRoutes:Routes = [
        { path:'',component:HomeComponent },
        { path: 'dashboard' , component:DashboardComponent },
        { path: 'add' , component:AddComponent },
        { path: 'edit/:id', component:EditComponent },
        { path: 'post/:id', component:PostComponent }
    ]


export const HomeRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);