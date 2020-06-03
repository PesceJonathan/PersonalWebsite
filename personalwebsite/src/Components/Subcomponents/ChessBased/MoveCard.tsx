import React, { Component } from "react";
import styled from "styled-components";
import { IMove } from "../../../types/ChessPage";

export class MoveCard extends Component<IProps> {
    render() {
        return (
            <Card>
                <Title>Moves</Title>
                <Moves>
                    {this.props.moves.map((move: IMove, i: number) => this.renderMove(move, i + 1))}
                </Moves>
            </Card>
        );
    }

    private renderTime(time: number, index: number) {
        let width: number =  (this.props.timeFormat / 12) / time;

        if (width > 100)
            width = 100;

        return (
            <Time>{index % 2 == 0 ? <WhiteTime style={{width: width + "%"}}/> : <BlackTime style={{width: width + "%"}}/>} {time}</Time>
        );
    }

    private renderMove(move: IMove, moveNum: number) {
        let { moves, times } = move;

        return (
            <MoveAndTime>
                <Move>{moveNum}. {moves.map((move: string) => move + " ")}</Move>
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
    moves: IMove[]
}

const Card = styled.div`
    height: 340px;
    width: 150px;
    background-color: #f1f1f1;
    border: 1px gray solid;
    border-radius: 10px;
`

const MoveAndTime = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 21px;
    padding: 5px 0px;
    width: 100%;
`

const Moves = styled.div`
    overflow: auto;
`

const Move = styled.div`
    font-weight: 450;
    font-size: 18px;

`
const Title = styled.div`
    width: 100%;
    border-bottom: 1px black solid;
    font-size: 20px;
    padding-left: 10px;
    font-weight: bold;
    box-sizing: border-box;
`

const Times = styled.div`
    height: 100%; 
    width: 50%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Time = styled.div`
    width: 100%;
    height: 40%;

    display: flex;
    align-content: center;
    justify-content: flex-end;
    font-size: 9px;
`

const WhiteTime = styled.div`
    height: 100%;
    width: 50%;
    margin-right: 3px;
    background-color: lightgray;
`

const BlackTime = styled.div`
    height: 100%;
    width: 50%;
    margin-right: 3px;
    background-color: black;
`

