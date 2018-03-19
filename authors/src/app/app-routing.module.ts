import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'add',component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'quotes/:id', component: QuotesComponent },
  { path: 'new-quote/:id', component: NewQuoteComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }