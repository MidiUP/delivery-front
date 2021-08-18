import { AdicionarEnderecoComponent } from "./user/adicionar-usuario/adicionar-endereco/adicionar-endereco.component";
import { AdicionarUsuarioComponent } from "./user/adicionar-usuario/adicionar-usuario.component";
import { HomeComponent } from "./home/home.component";
import { PainelAdminComponent } from "./painel-admin/painel-admin.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./auth/login/login.component";


export const ROUTES = [
    {path: '', component: HomeComponent},
    {path: 'addEndereco', component: AdicionarEnderecoComponent}, 
    {path: 'addUsuario', component: AdicionarUsuarioComponent},
    {path: 'admin', component: PainelAdminComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFoundComponent}

]