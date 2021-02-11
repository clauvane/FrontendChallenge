import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: "Teams",
      icon: "sports_kabaddi",
      routeUrl: "/teams"
    }
   }

  ngOnInit(): void {
  }

  navigateToTeamCreate(): void {
    this.router.navigate(['/teams/create'])
  }

}
