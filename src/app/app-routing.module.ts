import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then(m => m.PeopleModule),
  },
  {
    path: 'person/:id',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
  },
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: '**', redirectTo: '/people' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
