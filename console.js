"use strict";
exports.__esModule = true;
exports.Match = exports.SideMatch = exports.Team = void 0;
var Team = /** @class */ (function () {
    function Team(name) {
        this.name = name;
    }
    return Team;
}());
exports.Team = Team;
var SideMatch = /** @class */ (function () {
    function SideMatch(team, score) {
        this.team = team;
        this.score = score;
    }
    return SideMatch;
}());
exports.SideMatch = SideMatch;
var Match = /** @class */ (function () {
    function Match(game) {
        this.game = game;
    }
    Match.prototype.addScore = function (team, goal) {
        this.game[team].score += goal;
    };
    Match.prototype.winner = function () {
        if (this.game[0].score > this.game[1].score)
            return this.game[0].team.name;
        if (this.game[0].score < this.game[1].score)
            return this.game[1].team.name;
        return 'tie';
    };
    Match.prototype.toString = function () {
        console.log("".concat(this.game[0].team.name, " ").concat(this.game[0].score, " vs ").concat(this.game[1].score, " ").concat(this.game[1].team.name));
    };
    return Match;
}());
exports.Match = Match;
/**
 * testing
 */
var team1 = new Team('Brazil');
var team2 = new Team('Canada');
console.log(team1);
console.log(team2);
var sideMatch1 = new SideMatch(team1, 0);
var sideMatch2 = new SideMatch(team2, 0);
console.log(sideMatch1);
console.log(sideMatch2);
var game1 = [];
game1.push(sideMatch1);
game1.push(sideMatch2);
var match1 = new Match(game1);
console.log(match1);
match1.toString();
console.log("The Winner is ".concat(match1.winner()));
match1.addScore(0, 2);
match1.toString();
console.log("The Winner is ".concat(match1.winner()));
match1.addScore(1, 3);
match1.toString();
console.log("The Winner is ".concat(match1.winner()));
