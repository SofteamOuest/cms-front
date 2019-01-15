import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingsComponent } from './trainings/trainings.component';
import { NavComponent } from './nav/nav.component';
import { DetailTrainingComponent } from './detail-training/detail-training.component';

const routes: Routes = [
  { path: "trainings", component: TrainingsComponent},
  { path: "trainings/detailTraining/:trainingId", component: DetailTrainingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
