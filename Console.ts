/**
 * @author Gabriel Aquino
 * @date Dec/16/2022
 */

/**
 * Team information
 */
export class Team {    
    constructor( public name: string ) {}
}

/**
 * Half side of each match, with team and score of the team
 */
export class SideMatch {
    constructor( public team: Team, public score: number) {}
}

/**
 * Two side matches, that represents the match itself
 */
export class Match {
    constructor( private game: SideMatch[] ) { }

    addScore(team: number, goal: number) {
        this.game[team].score += goal;
    }

    winner() : number {
        if( this.game[0].score > this.game[1].score )
            return 0;
        if( this.game[0].score < this.game[1].score )
            return 1;            
        return -1;            
    }

    toString() {
        console.log( `${this.game[0].team.name} ${this.game[0].score} vs ${this.game[1].score} ${this.game[1].team.name}` );        
    }
}

/**
 * Team stats, with points, (todo: victories, draws, loses, goals forward, goals against, goals difference)
 */
export class TeamStats {

    constructor(public team: Team, public point: number) {}
}

export class Tournament {
    private teams: Team[];
    private table: TeamStats[];
    private fixtures: Match[];

    constructor() {}

    public addTeam(teamName: string) {
        let team: Team = new Team(teamName);
        this.teams.push(team);
        let teamStats = new TeamStats(team, 0);
        this.table.push(teamStats);
    }

    /**
     * Get the team
     * #question how to return only the Team type? It's requiring to define undefined
     * @param teamName 
     * @returns 
     */
    public getTeam(teamName :string) : Team {
        try {
            let teamFound = new Team('temp');
            teamFound = this.teams.find(t => t.name = teamName);
            if (teamFound === undefined) {
                throw new TypeError('The value was promised to always be there!');
              }
            return teamFound;   
        } catch (error) {
            throw error;
        }
            
    }

    public addMatch(team1: Team, team2: Team) {
        let sideMatch1: SideMatch = new SideMatch(team1, 0);
        let sideMatch2: SideMatch = new SideMatch(team2, 0);

        var game1: SideMatch[] = [];

        game1.push(sideMatch1);
        game1.push(sideMatch2);

        let match1 = new Match( game1 );

        this.fixtures.push(match1);
    }

    public addMatchResults(matchIndex: number, score1: number, score2: number) {
        this.fixtures[matchIndex].addScore(0, score1);
        this.fixtures[matchIndex].addScore(1, score2);
        this.calculateMatchPoints(matchIndex);
    }

    private calculateMatchPoints(matchIndex: number) {
        let results : number = this.fixtures[matchIndex].winner();
        if (results !== -1)
        {
            console.log(this.fixtures[matchIndex][results]);             
        }       
        
    }

    public getMatch(index: number) : Match {
        return this.fixtures[index];
    }

}
/**
 * testing
 */

// let team1 = new Team('Brazil');
// let team2 = new Team('Canada');

// console.log(team1);
// console.log(team2);

// let sideMatch1 = new SideMatch(team1, 0);
// let sideMatch2 = new SideMatch(team2, 0);

// console.log(sideMatch1);
// console.log(sideMatch2);

// var game1: SideMatch[] = [];

// game1.push(sideMatch1);
// game1.push(sideMatch2);

// let match1 = new Match( game1 );

// console.log(match1);

// match1.toString();
// console.log(`The Winner is ${match1.winner()}`);

// match1.addScore(0, 2);

// match1.toString();
// console.log(`The Winner is ${match1.winner()}`);


// match1.addScore(1, 3);
// match1.toString();
// console.log(`The Winner is ${match1.winner()}`);


let worldCup2022: Tournament = new Tournament();

worldCup2022.addTeam('Brazil');
worldCup2022.addTeam('Canada');

worldCup2022.addMatch(worldCup2022.getTeam('Brazil'),worldCup2022.getTeam('Canada'));

worldCup2022.addMatchResults(0, 2, 0);




