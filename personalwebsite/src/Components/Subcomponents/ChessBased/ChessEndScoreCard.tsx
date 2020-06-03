import React, { Component } from "react";
import { IPlayerInformation } from "../../../types/chess-com";

export class ChessEndScoreCard extends Component<IProps> {
    render() {
        let {white, black} = this.props;
        let outcome: string = this.determineOutcome(white, black);

        return (
            <div>   
                <div>Game Over</div>
                <div>{outcome}</div>
            </div>
        );
    }

    private determineOutcome(white: IPlayerInformation, black: IPlayerInformation): string {
        let winner: string;
        let loser: string;
        let result: string;

        if (white.result === "win") {
            winner = white.username;
            loser = black.username;
            result = black.result;
        } else if (black.result === "win") {
            winner = black.username;
            loser = white.username;
            result = white.result;
        } else {
            return this.drawType(white.result);
        }

        return this.getEndResult(winner, loser, result);
    }

    private drawType(result: string) {
        if (result === "agreed")
            return "Players agreed to a draw";

        if (result === "repetition")
            return "Draw by repetition";

        if (result === "stalemate")
            return "Draw due to stalemate";

        return "Draw due to insufficient material"
    }

    private getEndResult(winner: string, loser: string, result: string): string {
        if (result === "checkmated")
            return winner + " checkmated " + loser + " to win the game";
        
        if (result === "timeout")
            return winner + " won the game as " + loser + " timedout";

        //if (result === "resigned")
        return winner + " won the game as " + loser + " resigned";
    }
}

//Define the props
interface IProps {
    white: IPlayerInformation,
    black: IPlayerInformation
}