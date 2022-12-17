"use strict";
/**
 * @author Gabriel Aquino
 * @date Dec/16/2022
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = exports.TeamStats = exports.Match = exports.SideMatch = exports.Team = void 0;
/**
 * Team information
 */
class Team {
    constructor(name) {
        this.name = name;
    }
}
exports.Team = Team;
/**
 * Half side of each match, with team and score of the team
 */
class SideMatch {
    constructor(team, score) {
        this.team = team;
        this.score = score;
    }
}
exports.SideMatch = SideMatch;
/**
 * Two side matches, that represents the match itself
 */
class Match {
    constructor(game) {
        this.game = game;
    }
    addScore(team, goal) {
        this.game[team].score += goal;
    }
    winner() {
        if (this.game[0].score > this.game[1].score)
            return 0;
        if (this.game[0].score < this.game[1].score)
            return 1;
        return -1;
    }
    getGame() {
        return this.game;
    }
    toString() {
        console.log(`${this.game[0].team.name} ${this.game[0].score} vs ${this.game[1].score} ${this.game[1].team.name}`);
    }
}
exports.Match = Match;
/**
 * Team stats, with points, (todo: victories, draws, loses, goals forward, goals against, goals difference)
 */
class TeamStats {
    constructor(team, point) {
        this.team = team;
        this.point = point;
    }
}
exports.TeamStats = TeamStats;
class Tournament {
    constructor() {
        this.teams = [];
        this.table = [];
        this.fixtures = [];
    }
    addTeam(teamName) {
        let team = new Team(teamName);
        this.teams.push(team);
        console.log(this.teams);
        let teamStats = new TeamStats(team, 0);
        this.table.push(teamStats);
    }
    /**
     * Get the team
     * #question how to return only the Team type? It's requiring to define undefined
     * @param teamName
     * @returns
     */
    getTeam(teamName) {
        try {
            //let teamFound = new Team('temp');
            let teamFound = this.teams.find(t => t.name === teamName);
            // console.log(`team found ${teamFound.name}`);
            if (teamFound === undefined) {
                throw new TypeError('The value was promised to always be there!');
            }
            return teamFound;
        }
        catch (error) {
            throw error;
        }
    }
    addMatch(team1, team2) {
        let sideMatch1 = new SideMatch(team1, 0);
        let sideMatch2 = new SideMatch(team2, 0);
        console.log(`add match - sm1 ${sideMatch1.team.name}`);
        console.log(`add match - sm2 ${sideMatch2.team.name}`);
        var game1 = [];
        game1.push(sideMatch1);
        game1.push(sideMatch2);
        console.log(game1);
        let match1 = new Match(game1);
        this.fixtures.push(match1);
    }
    addMatchResults(matchIndex, score1, score2) {
        this.fixtures[matchIndex].addScore(0, score1);
        this.fixtures[matchIndex].addScore(1, score2);
        this.calculateMatchPoints(matchIndex);
    }
    calculateMatchPoints(matchIndex) {
        let results = this.fixtures[matchIndex].winner();
        console.log(results);
        if (results !== -1) {
            console.log(this.fixtures[matchIndex].getGame());
        }
    }
    getMatch(index) {
        return this.fixtures[index];
    }
}
exports.Tournament = Tournament;
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
let worldCup2022 = new Tournament();
worldCup2022.addTeam('Brazil');
worldCup2022.addTeam('Canada');
console.log('t1 name with getTeam ' + worldCup2022.getTeam('Canada').name); // shows correctly t1 name Canada
console.log('t2 name with getTeam ' + worldCup2022.getTeam('Brazil').name); // shows correctly t2 name Brazil
const team1 = worldCup2022.getTeam('Canada');
const team2 = worldCup2022.getTeam('Brazil');
console.log('t1 name ' + team1.name); // shows incorrectly t1 name as Brazil (last one got)
console.log('t2 name ' + team2.name); // shows incorrectly t1 name as Brazil (last one got)
worldCup2022.addMatch(team1, team2);
worldCup2022.addMatchResults(0, 2, 0);
