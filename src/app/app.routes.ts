// import { AdicionarEnderecoComponent } from "./user/adicionar-usuario/adicionar-endereco/adicionar-endereco.component";
// import { AdicionarUsuarioComponent } from "./user/adicionar-usuario/adicionar-usuario.component";
import { HomeComponent } from "./home/home.component";
import { PainelAdminComponent } from "./painel-admin/painel-admin.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./auth/login/login.component";
import { NovoUsuarioComponent } from "./user/novo-usuario/novo-usuario.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth/auth-guard.service";
import { SobreComponent } from "./sobre/sobre.component";


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'novoUsuario', component: NovoUsuarioComponent},
    {path: 'admin', component: PainelAdminComponent, canActivate: [ AuthGuard ]},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'sobre', component: SobreComponent},
    {path: '**', component: NotFoundComponent}

]