import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProdutosComponent } from './produtos/produtos.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "clientes",
                component: ClientesComponent
            },
            {
                path: "produtos",
                component: ProdutosComponent
            }
        ]
    }
];