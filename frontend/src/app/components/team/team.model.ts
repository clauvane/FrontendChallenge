export interface Team {
    id?: number
    name: string
    intelligence: number
    strength: number
    agility: number
}

export interface Playoffs {
    id?: number
    team_a: Team
    team_b: Team
    winner?: Team
    loser?: Team
    round: number
}

export interface Tournament {
    id?: number
    round: number
    playoffs: Playoffs[]
}