import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CrudComponent} from '../app/Cita/crud.component';
import { CreateComponent } from './Cita/create.component';
import { EditComponent } from './Cita/edit.component'


const routes: Routes = [
  {path: '',redirectTo: 'Cita',pathMatch: 'full'},
  { path: 'Cita', component: CrudComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
