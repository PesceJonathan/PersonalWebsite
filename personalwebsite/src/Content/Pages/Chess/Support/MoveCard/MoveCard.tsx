import React, { Component } from "react";
import { IMove } from "../../../../../types/ChessPage";
import { Card, Moves, Time, WhiteTime, BlackTime, MoveAndTime, Move, Times, Title } from "./MoveCard.styles";

export class MoveCard extends Component<IProps> {
    render() {
        return (
            <Card mobile={this.props.mobile ? true : false}>
                <Title>Moves</Title>
                <Moves>
                    {this.props.moves.map((move: IMove, i: number) => this.renderMove(move, i + 1))}
                </Moves>
            </Card>
        );
    }

    private renderTime(time: number, index: number) {
        let constTime = this.props.timeFormat / 8;
        let width: number =  (constTime - time) / constTime;
        
        if (width < 0) 
            width = 0;

        width = (1 - width) * 100;

        if (width > 100)
            width = 100;

        return (
            <Time>{index % 2 === 0 ? <WhiteTime style={{width: width + "%"}}/> : <BlackTime style={{width: width + "%"}}/>} {time.toFixed(1)}</Time>
        );
    }

    private renderMove(move: IMove, moveNum: number) {
        let { moves, times } = move;

        return (
            <MoveAndTime>
                <Move>{moveNum} {moves.map((move: string) => move + " ")}</Move>
                <Times>
                    {times.map((time: number, index: number) => this.renderTime(time, index))}
                </Times>
            </MoveAndTime>
        );
    }
}

//Define props
interface IProps {
    timeFormat: number,
    moves: IMove[],
    mobile?: boolean
}



