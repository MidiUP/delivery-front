import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes'
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
import {MatDialogModule, MatDialogState} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserService } from './user/user.service';
import { ProductService } from './novo-produto/product.service';
import { AlertaSuccesComponent } from './alerta-succes/alerta-succes.component';
import { AlertaErrorComponent } from './alerta-error/alerta-error.component';
import { DialogDeleteComponent } from './editar-produto/dialog-delete/dialog-delete.component';
import { categoriaService } from './categorias/categoria.service';
import { bairroService } from './novo-bairro/bairro.service';
import { EmpresaService } from './info-empresa/empresa.service';
import { DialogProdutoComponent } from './home/dialog-produto/dialog-produto.component';
import { addressService } from './enderecos/address.service';
import { MetodoPagamentoComponent } from './metodo-pagamento/metodo-pagamento.component';
import { orderService } from './home/order.service';
import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { metodoPagamentoService } from './metodo-pagamento/metodoPagamento.service';
import { NovoMetodoPagamentoComponent } from './novo-metodo-pagamento/novo-metodo-pagamento.component';
import { EditarMetodoPagamentoComponent } from './editar-metodo-pagamento/editar-metodo-pagamento.component';
import { LoginComponent } from './auth/login/login.component';
import { authService } from './auth/auth.service/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NovoUsuarioComponent } from './user/novo-usuario/novo-usuario.component';
import { NovoEnderecoComponent } from './enderecos/novo-endereco/novo-endereco.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DialogCarrinhoMobileComponent } from './home/dialog-carrinho-mobile/dialog-carrinho-mobile.component';
import { carrinhoService } from './home/carrinho.service';
import { CarrinhoVazioComponent } from './snack-bars/carrinho-vazio/carrinho-vazio.component';
import { MetodoPagamentoNullComponent } from './snack-bars/metodo-pagamento-null/metodo-pagamento-null.component';
import { AddressNullComponent } from './snack-bars/address-null/address-null.component';
import { DialogDeleteEnderecoComponent } from './perfil/dialog-delete-endereco/dialog-delete-endereco.component';
import { DialogInfoComponent } from './editar-produto/dialog-info/dialog-info.component';
import { DialogEditarProdutoComponent } from './editar-produto/dialog-editar-produto/dialog-editar-produto.component';
import { DialogAdicionarProdutoComponent } from './home/dialog-adicionar-produto/dialog-adicionar-produto.component';
import { DialogFinalizarPedidoComponent } from './home/dialog-finalizar-pedido/dialog-finalizar-pedido.component';
import { AdicionaisComponent } from './adicionais/adicionais.component';
import { AdicionalService } from './adicionais/adicional.service';
import { DialogCriarAdicionalComponent } from './adicionais/dialog-criar-adicional/dialog-criar-adicional.component';
import { DialogEditarAdicionalComponent } from './adicionais/dialog-editar-adicional/dialog-editar-adicional.component';
import { DialogDeleteAdicionalComponent } from './adicionais/dialog-delete-adicional/dialog-delete-adicional.component';
import { DialogPedidoComponent } from './painel-pedidos/dialog-pedido/dialog-pedido.component';
import { DialogHistoricoComponent } from './home/dialog-historico/dialog-historico.component';
import { TrocoErradoComponent } from './snack-bars/troco-errado/troco-errado.component';
import { CpfCadastradoComponent } from './snack-bars/cpf-cadastrado/cpf-cadastrado.component';
import { NumeroCadastradoComponent } from './snack-bars/numero-cadastrado/numero-cadastrado.component';
import { DialogDeleteCategoryComponent } from './categorias/dialog-delete-category/dialog-delete-category.component';
import { DialogEditCategoryComponent } from './categorias/dialog-edit-category/dialog-edit-category.component';
import { FalhaLoginComponent } from './snack-bars/falha-login/falha-login.component';
import { DialogRedefinirSenhaComponent } from './perfil/dialog-redefinir-senha/dialog-redefinir-senha.component';
import { SenhaDiferenteRepetirComponent } from './snack-bars/senha-diferente-repetir/senha-diferente-repetir.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
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
    AlertaSuccesComponent,
    AlertaErrorComponent,
    DialogDeleteComponent,
    DialogProdutoComponent,
    MetodoPagamentoComponent,
    PainelPedidosComponent,
    NovoMetodoPagamentoComponent,
    EditarMetodoPagamentoComponent,
    LoginComponent,
    NovoUsuarioComponent,
    NovoEnderecoComponent,
    PerfilComponent,
    DialogCarrinhoMobileComponent,
    CarrinhoVazioComponent,
    MetodoPagamentoNullComponent,
    AddressNullComponent,
    DialogDeleteEnderecoComponent,
    DialogInfoComponent,
    DialogEditarProdutoComponent,
    DialogAdicionarProdutoComponent,
    DialogFinalizarPedidoComponent,
    AdicionaisComponent,
    DialogCriarAdicionalComponent,
    DialogEditarAdicionalComponent,
    DialogDeleteAdicionalComponent,
    DialogPedidoComponent,
    DialogHistoricoComponent,
    TrocoErradoComponent,
    CpfCadastradoComponent,
    NumeroCadastradoComponent,
    DialogDeleteCategoryComponent,
    DialogEditCategoryComponent,
    FalhaLoginComponent,
    DialogRedefinirSenhaComponent,
    SenhaDiferenteRepetirComponent,
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
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [UserService, ProductService, categoriaService, bairroService, EmpresaService, addressService, orderService, metodoPagamentoService, authService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, carrinhoService, AdicionalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
