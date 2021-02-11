import { TeamService } from '../team.service';
import { Team } from '../team.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-read',
  templateUrl: './team-read.component.html',
  styleUrls: ['./team-read.component.css']
})
export class TeamReadComponent implements OnInit {

  teams: MatTableDataSource<Team>
  dataSource: MatTableDataSource<Team>
  
  displayedColumns = ['id', 'name', 'intelligence', 'strength', 'agility', 'probability', 'action']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  calculateProbability = (team: Team) => Math.floor(((Number(team.intelligence) + Number(team.strength) + Number(team.agility)) / 300)*100)
  
  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadList()
  }

  deleteTeam(id: number): void {
    this.teamService.delete(id).subscribe(() => {
      this.teamService.showMessage("Team removed success!");
      this.loadList()
    });
  }
  
  loadList(): void {
    this.teamService.read().subscribe(teams => {
      this.teams = new MatTableDataSource<Team>(teams)
      this.teams.paginator = this.paginator
    })
  }

}
