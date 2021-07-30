import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES } from './app.routes'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';


import { AdicionarEnderecoComponent } from './user/adicionar-endereco/adicionar-endereco.component';
import { AdicionarUsuarioComponent } from './user/adicionar-usuario/adicionar-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdicionarUsuarioFormComponent } from './user/adicionar-usuario/adicionar-usuario-form/adicionar-usuario-form.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdicionarEnderecoComponent,
    AdicionarUsuarioComponent,
    NotFoundComponent,
    AdicionarUsuarioFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatInputModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
