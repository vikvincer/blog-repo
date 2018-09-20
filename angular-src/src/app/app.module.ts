import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { HeaderNavComponent } from './shared/components/header-nav/header-nav.component';









@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
