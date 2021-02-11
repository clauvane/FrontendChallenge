import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { TeamComponent } from './views/team/team.component';
import { TeamDeleteComponent } from './components/team/team-delete/team-delete.component';
import { TeamUpdateComponent } from './components/team/team-update/team-update.component';
import { TeamCreateComponent } from './components/team/team-create/team-create.component';
import { TournamentComponent } from './views/tournament/tournament.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "teams",
    component: TeamComponent
  },
  {
    path: "teams/create",
    component: TeamCreateComponent
  },
  {
    path: "teams/update/:id",
    component: TeamUpdateComponent
  },
  {
    path: "teams/delete/:id",
    component: TeamDeleteComponent
  },
  {
    path: "tournament",
    component: TournamentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
