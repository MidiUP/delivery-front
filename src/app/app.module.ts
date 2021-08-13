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

import { PainelAdminComponent } from './painel-admin/painel-admin.component';


import {MatSidenavModule} from '@angular/material/sidenav';

import { InfoEmpresaComponent } from './info-empresa/info-empresa.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { BairrosComponent } from './bairros/bairros.component';
import { NovoBairroComponent } from './novo-bairro/novo-bairro.component';
import { EditarBairroComponent } from './editar-bairro/editar-bairro.component';
import { PersonalizacaoComponent } from './personalizacao/personalizacao.component';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';


import { AdicionarEnderecoComponent } from './user/adicionar-usuario/adicionar-endereco/adicionar-endereco.component';
import { AdicionarUsuarioComponent } from './user/adicionar-usuario/adicionar-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdicionarUsuarioFormComponent } from './user/adicionar-usuario/adicionar-usuario-form/adicionar-usuario-form.component';
import { UserService } from './user/user.service';
import { ProductService } from './novo-produto/product.service';
import { AlertaSuccesComponent } from './alerta-succes/alerta-succes.component';
import { AlertaErrorComponent } from './alerta-error/alerta-error.component';
import { DialogDeleteComponent } from './editar-produto/dialog-delete/dialog-delete.component';
import { categoriaService } from './categorias/categoria.service';
import { bairroService } from './novo-bairro/bairro.service';
import { EmpresaService } from './info-empresa/empresa.service';
import { DialogProdutoComponent } from './home/dialog-produto/dialog-produto.component';
import { addressService } from './user/adicionar-usuario/adicionar-endereco/address.service';
import { MetodoPagamentoComponent } from './metodo-pagamento/metodo-pagamento.component';
import { orderService } from './home/order.service';
import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { metodoPagamentoService } from './metodo-pagamento/metodoPagamento.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdicionarEnderecoComponent,
    AdicionarUsuarioComponent,
    PainelAdminComponent,
    InfoEmpresaComponent,
    NovoProdutoComponent,
    EditarProdutoComponent,
    CategoriasComponent,
    BairrosComponent,
    NovoBairroComponent,
    EditarBairroComponent,
    PersonalizacaoComponent,
    NotFoundComponent,
    AdicionarUsuarioFormComponent,
    AlertaSuccesComponent,
    AlertaErrorComponent,
    DialogDeleteComponent,
    DialogProdutoComponent,
    MetodoPagamentoComponent,
    PainelPedidosComponent,
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
    FontAwesomeModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [UserService, ProductService, categoriaService, bairroService, EmpresaService, addressService, orderService, metodoPagamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
