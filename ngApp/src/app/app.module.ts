import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './_services/home.service';
import { HttpModule } from '@angular/http';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    EditTenantComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
