import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { FilmComponent } from './pages/film/film.component';
import { TopComponent } from './pages/top/top.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: MainComponent },
      { path: 'film/:id', component: FilmComponent },
      { path: 'top', component: TopComponent },
      { path: 'error', component: ErrorComponent },
      { path: '**', redirectTo: 'error' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
