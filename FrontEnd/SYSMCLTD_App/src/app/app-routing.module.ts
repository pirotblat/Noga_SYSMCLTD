import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFullComponent } from './components/customers/customer-full/customer-full.component';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {path: '', redirectTo:'customers', pathMatch: 'full'},
  {path: 'customers', component: CustomersComponent},
  {path: 'customers/:id', component: CustomerFullComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
