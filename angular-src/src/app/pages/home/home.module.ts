import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HomeRouting } from './home.routing';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { BlogFormComponent } from '../../shared/components/blog-form/blog-form.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';



@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    MatInputModule,
    EditorModule,
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    AddComponent,
    BlogFormComponent,
    SafePipe,
    EditComponent,
    PostComponent
  ],
  exports:[
    MatInputModule,
    SafePipe
  ]
})
export class HomeModule { }
