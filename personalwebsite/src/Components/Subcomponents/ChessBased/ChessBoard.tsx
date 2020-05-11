import React, { Component } from "react";
import Chessground from 'react-chessground';
import 'react-chessground/dist/assets/chessground.css';
import 'react-chessground/dist/assets/theme.css'; // Or your own chess theme
import { Timer } from "./Timer";
import styled from "styled-components";
import { PlayerInformation } from "./PlayerInformation";

export class ChessBoard extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Wrapper>
                <PlayerInformation username={"PesceTheFish"} elo={"1025"} time={"1:00"}/>
                <div className="merida"><Chessground fen={"r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19"}/></div>
                <PlayerInformation username={"PesceTheFish"} elo={"1025"} time={"1:00"}/>
            </Wrapper>
        );
    }
}

//Defining Styled-Components
const Wrapper = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    width: fit-content;
`



