import { AdicionarEnderecoComponent } from "./adicionar-endereco/adicionar-endereco.component";
import { AdicionarUsuarioComponent } from "./adicionar-usuario/adicionar-usuario.component";
import { HomeComponent } from "./home/home.component";

export const ROUTES = [
    {path: '', component: HomeComponent},
    {path: 'novoEndereco', component: AdicionarEnderecoComponent},
    {path: 'novoUsuario', component: AdicionarUsuarioComponent},
]