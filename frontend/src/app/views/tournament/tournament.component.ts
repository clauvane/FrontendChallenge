import { Component, OnInit } from '@angular/core';
import { INSPECT_MAX_BYTES } from 'buffer';
import { Playoffs, Team, Tournament } from 'src/app/components/team/team.model';
import { TeamService } from 'src/app/components/team/team.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  teams: Team[]
  tournaments: Tournament[] = []

  constructor(private teamService: TeamService, private headerService: HeaderService) {
    headerService.headerData = {
      title: "Tournament",
      icon: "play_circle",
      routeUrl: "/tournament"
    }
   }

   // https://github.com/coolaj86/knuth-shuffle
   shuffle = (array: Team[]): Team[] => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  loadTeams() {
    this.teamService.read().subscribe(teams => this.teams = teams)
  }

  ngOnInit(): void {
    this.loadTeams()
  }

  start() {
    this.generateRound(this.teams, 1)
  }

  restart() {
    this.loadTeams()
    this.tournaments = []
  }

  calculateProbability = (team: Team) => {
    if(!team) return 0

    return Math.floor(((Number(team.intelligence) + Number(team.strength) + Number(team.agility)) / 300)*100)
  }
  
  generateRound(teams: Team[], round: number) {
    let playoffs: Playoffs[] = []
    let count = 1
    this.shuffle(teams)
    for(let i = 0; i < teams.length; i += 2) {
      let playoff = {
        id: count,
        team_a: teams[i],
        team_b: teams[i+1],
        round
      }
      playoffs.push(playoff)
      count++
    }
    this.tournaments.push({round, playoffs})
  }

  nextRound(tournament: Tournament): void {
    let { playoffs, round } = tournament
    let winners = playoffs.map(({winner}) => winner)
    let hasError = false
    winners.forEach(winner => {
      if(!winner || !winner.id){
        hasError = true
        this.teamService.showMessage('Attention! Round is incomplete.', true)
      }
    })

    if(!hasError) {
      this.generateRound(winners, round + 1)
    }
  }

  fight(playoff: Playoffs, playoffs: Playoffs[]): void {
    if(playoff.winner) {
      return
    }
    let { team_a, team_b } = playoff
    let prob_team_a = this.calculateProbability(team_a)
    let prob_team_b = team_b && this.calculateProbability(team_b) || 0 // Team A always win when team B missing
    let numRandom = Math.floor(Math.random() * (prob_team_a + prob_team_b))
    if(numRandom <= prob_team_a) {
      playoff.winner = team_a
      playoff.loser = team_b
    } else {
      playoff.winner = team_b
      playoff.loser = team_a
    }

    if(playoffs.length == 1) {
      this.teamService.showMessage(`Congratulations ${team_a.name}! You are the great champion.`)
    }
  }

  fightAll(playoffs: Playoffs[]): void {
    playoffs.forEach(playoff => this.fight(playoff, playoffs))
  }

  showButtonFightAll(playoffs: Playoffs[]): boolean {
    return playoffs.filter(p => !p.winner).length > 0
  }

  showActionCard(tournament: Tournament, tournaments: Tournament[]): boolean {
    return tournament.round == tournaments.length && tournament.playoffs.length > 1
  }

}
