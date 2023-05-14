import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ListaCompletaComponent } from './components/cliente/lista-completa/lista-completa.component';

const routes: Routes = [
  {
    path: 'cliente', component: ClienteComponent, children: [
      { path: 'ver', component: ListaCompletaComponent},
      { path: 'ver/:id', component: ListaCompletaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
