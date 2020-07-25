import React, { Component } from "react";
import { IPlayerInformation } from "../../../../../types/chess-com";
import { GameCard, red, gray, green, Title, GameResult, GameText } from "./ChessEndScoreCard.styles";

export class ChessEndScoreCard extends Component<IProps> {
    render() {
        let {white, black, currentUser} = this.props;

        return (
            <GameCard>   
                {this.determineOutcome(white, black, currentUser)}
            </GameCard>
        );
    }

    private determineOutcome(white: IPlayerInformation, black: IPlayerInformation, currentUser: string): JSX.Element {
        let winner: string;
        let loser: string;
        let result: string;
        let colour: string = red; 
        let endGameResult: string;

        if (white.result === "win") {
            winner = white.username;
            loser = black.username;
            result = black.result;

            endGameResult = this.getEndResult(winner, loser, result);

            if (white.username === currentUser)
                colour = green;
        } else if (black.result === "win") {
            winner = black.username;
            loser = white.username;
            result = white.result;

            endGameResult = this.getEndResult(winner, loser, result);

            if (black.username === currentUser)
                colour = green;
        } else {
            colour = gray;
            endGameResult = this.drawType(white.result);
        }

        return (
            <>
                <Title color={colour}>Game Over</Title>
                <GameResult><GameText>{endGameResult}</GameText></GameResult>
            </>
        )
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
    black: IPlayerInformation,
    currentUser: string
}