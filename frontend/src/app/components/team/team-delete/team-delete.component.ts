import { Router, ActivatedRoute } from "@angular/router";
import { TeamService } from "../team.service";
import { Team } from "../team.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-team-delete",
  templateUrl: "./team-delete.component.html",
  styleUrls: ["./team-delete.component.css"],
})
export class TeamDeleteComponent implements OnInit {
  team: Team = {
    name: '',
    intelligence: 1,
    strength: 1,
    agility: 1
  }

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamService.readById(id).subscribe((team) => {
      this.team = team;
    });
  }

  deleteTeam(): void {
    const { name = '' } = this.team
    if (name == null || name.trim() == '') {
      this.teamService.showMessage('You must enter a valid name!', true)
    } else {
      this.teamService.delete(this.team.id).subscribe(() => {
        this.teamService.showMessage("Team removed success!");
        this.router.navigate(["/teams"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/teams"]);
  }
}
