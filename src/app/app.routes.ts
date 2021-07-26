import { AdicionarEnderecoComponent } from "./adicionar-endereco/adicionar-endereco.component";
import { HomeComponent } from "./home/home.component";

export const ROUTES = [
    {path: '', component: HomeComponent},
    {path: '/addEndereco', component: AdicionarEnderecoComponent},
]