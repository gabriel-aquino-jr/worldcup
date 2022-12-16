"use strict";
/**
 * @author Gabriel Aquino
 * @date Dec/16/2022
 */
exports.__esModule = true;
exports.Tournament = exports.TeamStats = exports.Match = exports.SideMatch = exports.Team = void 0;
/**
 * Team information
 */
var Team = /** @class */ (function () {
    function Team(name) {
        this.name = name;
    }
    return Team;
}());
exports.Team = Team;
/**
 * Half side of each match, with team and score of the team
 */
var SideMatch = /** @class */ (function () {
    function SideMatch(team, score) {
        this.team = team;
        this.score = score;
    }
    return SideMatch;
}());
exports.SideMatch = SideMatch;
/**
 * Two side matches, that represents the match itself
 */
var Match = /** @class */ (function () {
    function Match(game) {
        this.game = game;
    }
    Match.prototype.addScore = function (team, goal) {
        this.game[team].score += goal;
    };
    Match.prototype.winner = function () {
        if (this.game[0].score > this.game[1].score)
            return 0;
        if (this.game[0].score < this.game[1].score)
            return 1;
        return -1;
    };
    Match.prototype.toString = function () {
        console.log("".concat(this.game[0].team.name, " ").concat(this.game[0].score, " vs ").concat(this.game[1].score, " ").concat(this.game[1].team.name));
    };
    return Match;
}());
exports.Match = Match;
/**
 * Team stats, with points, (todo: victories, draws, loses, goals forward, goals against, goals difference)
 */
var TeamStats = /** @class */ (function () {
    function TeamStats(team, point) {
        this.team = team;
        this.point = point;
    }
    return TeamStats;
}());
exports.TeamStats = TeamStats;
var Tournament = /** @class */ (function () {
    function Tournament() {
    }
    Tournament.prototype.addTeam = function (teamName) {
        var team = new Team(teamName);
        this.teams.push(team);
        var teamStats = new TeamStats(team, 0);
        this.table.push(teamStats);
    };
    /**
     * Get the team
     * #question how to return only the Team type? It's requiring to define undefined
     * @param teamName
     * @returns
     */
    Tournament.prototype.getTeam = function (teamName) {
        try {
            var teamFound = new Team('temp');
            teamFound = this.teams.find(function (t) { return t.name = teamName; });
            if (teamFound === undefined) {
                throw new TypeError('The value was promised to always be there!');
            }
            return teamFound;
        }
        catch (error) {
            throw error;
        }
    };
    Tournament.prototype.addMatch = function (team1, team2) {
        var sideMatch1 = new SideMatch(team1, 0);
        var sideMatch2 = new SideMatch(team2, 0);
        var game1 = [];
        game1.push(sideMatch1);
        game1.push(sideMatch2);
        var match1 = new Match(game1);
        this.fixtures.push(match1);
    };
    Tournament.prototype.addMatchResults = function (matchIndex, score1, score2) {
        this.fixtures[matchIndex].addScore(0, score1);
        this.fixtures[matchIndex].addScore(1, score2);
        this.calculateMatchPoints(matchIndex);
    };
    Tournament.prototype.calculateMatchPoints = function (matchIndex) {
        var results = this.fixtures[matchIndex].winner();
        if (results !== -1) {
            console.log(this.fixtures[matchIndex][results]);
        }
    };
    Tournament.prototype.getMatch = function (index) {
        return this.fixtures[index];
    };
    return Tournament;
}());
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
var worldCup2022 = new Tournament();
worldCup2022.addTeam('Brazil');
worldCup2022.addTeam('Canada');
worldCup2022.addMatch(worldCup2022.getTeam('Brazil'), worldCup2022.getTeam('Canada'));
worldCup2022.addMatchResults(0, 2, 0);
