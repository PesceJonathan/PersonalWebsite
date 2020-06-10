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
        let constTime = this.props.timeFormat / 10;
        let width: number =  (constTime - time) / constTime;
        
        if (width < 0) 
            width = 0;

        width = (1 - width) * 100;

        if (width > 100)
            width = 100;

        return (
            <Time>{index % 2 == 0 ? <WhiteTime style={{width: width + "%"}}/> : <BlackTime style={{width: width + "%"}}/>} {time.toFixed(1)}</Time>
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
    width: 200px;
    background-color: #f1f1f1;
    border: 1px gray solid;
    border-radius: 10px;
`

const MoveAndTime = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 21px;
    padding: 5px 0px;
    margin: 0px 4px;
    width: calc(100% - 8px);
`

const Moves = styled.div`
    overflow: auto;
    height: calc(100% - 24px);

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 20px;
    }

    &::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 20px;
    }
`

const Move = styled.div`
    font-weight: 450;
    font-size: 16px;

`
const Title = styled.div`
    height: fit-content;
    width: 100%;
    border-bottom: 1px black solid;
    font-size: 20px;
    padding-left: 10px;
    font-weight: bold;
    box-sizing: border-box;
`

const Times = styled.div`
    height: 100%;
    width: 40%;

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

