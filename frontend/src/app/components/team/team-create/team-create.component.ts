import { Team } from '../team.model';
import { TeamService } from '../team.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  team: Team = {
    name: '',
    intelligence: 1,
    strength: 1,
    agility: 1
  }

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {}

  createTeam(): void {
    const { name = '' } = this.team
    if(name == null || name.trim() == ''){
      this.teamService.showMessage('You must enter a valid name!', true)
    } else {
      this.teamService.create(this.team).subscribe(() => {
        this.teamService.showMessage('Team created!')
        this.router.navigate(['/teams'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/teams'])
  }
}
