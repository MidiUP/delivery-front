import { AdicionarEnderecoComponent } from "./user/adicionar-endereco/adicionar-endereco.component";
import { AdicionarUsuarioComponent } from "./user/adicionar-usuario/adicionar-usuario.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const ROUTES = [
    {path: '', component: HomeComponent},
    {path: '', redirectTo:'addUsuario', pathMatch: 'full'},
    {path: 'addUsuario', component: AdicionarUsuarioComponent},
    {path: 'addEndereco', component: AdicionarEnderecoComponent}, 
    {path: '**', component: NotFoundComponent}
]