// import { AdicionarEnderecoComponent } from "./user/adicionar-usuario/adicionar-endereco/adicionar-endereco.component";
// import { AdicionarUsuarioComponent } from "./user/adicionar-usuario/adicionar-usuario.component";
import { HomeComponent } from "./home/home.component";
import { PainelAdminComponent } from "./painel-admin/painel-admin.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./auth/login/login.component";
import { NovoUsuarioComponent } from "./user/novo-usuario/novo-usuario.component";
import { PerfilComponent } from "./perfil/perfil.component";


export const ROUTES = [
    {path: '', component: HomeComponent},
    {path: 'novoUsuario', component: NovoUsuarioComponent},
    {path: 'admin', component: PainelAdminComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: '**', component: NotFoundComponent}

]