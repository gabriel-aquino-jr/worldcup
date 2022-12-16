export class Team {
    constructor( public name: string ) {}
}

export class SideMatch {
    constructor( public team: Team, public score: number) {}
}

export class Match {
    constructor( private game: SideMatch[] ) { }

    addScore(team: number, goal: number) {
        this.game[team].score += goal;
    }

    winner() : string {
        if( this.game[0].score > this.game[1].score )
            return this.game[0].team.name;
        if( this.game[0].score < this.game[1].score )
            return this.game[1].team.name;            
        return 'tie';            
    }

    toString() {
        console.log( `${this.game[0].team.name} ${this.game[0].score} vs ${this.game[1].score} ${this.game[1].team.name}` );        
    }
}

export class TeamStats {
    public team: Team;
    public point: number;
}

export class Tournament {
    public table: TeamStats[];

    
}
/**
 * testing
 */

let team1 = new Team('Brazil');
let team2 = new Team('Canada');

console.log(team1);
console.log(team2);

let sideMatch1 = new SideMatch(team1, 0);
let sideMatch2 = new SideMatch(team2, 0);

console.log(sideMatch1);
console.log(sideMatch2);

var game1: SideMatch[] = [];

game1.push(sideMatch1);
game1.push(sideMatch2);

let match1 = new Match( game1 );

console.log(match1);

match1.toString();
console.log(`The Winner is ${match1.winner()}`);

match1.addScore(0, 2);

match1.toString();
console.log(`The Winner is ${match1.winner()}`);


match1.addScore(1, 3);
match1.toString();
console.log(`The Winner is ${match1.winner()}`);