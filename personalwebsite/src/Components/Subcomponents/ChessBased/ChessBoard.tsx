import React, { Component } from "react";
import Chessground from 'react-chessground';
import 'react-chessground/dist/assets/chessground.css';
import 'react-chessground/dist/assets/theme.css'; // Or your own chess theme
import styled from "styled-components";
import { PlayerInformation } from "./PlayerInformation";
import { IGame } from "../../../types/chess-com";

export class ChessBoard extends Component<IProps, any> {
    constructor(props: any) {
        super(props);

        let startTime = parseInt(this.props.game.time_control) / 60 + ":00";

        this.state = {
            whiteTime: startTime,
            blackTime: startTime,
            fenPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        }
    }

    render() {
        let {game} = this.props;
        return (
            <Wrapper>
                <PlayerInformation username={game.black.username} rating={game.black.rating} time={this.state.blackTime}/>
                <div className="merida"><Chessground fen={this.state.fenPosition}/></div>
                <PlayerInformation username={game.white.username} rating={game.white.rating} time={this.state.whiteTime}/>
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

//Define props
interface IProps {
    game: IGame
}

interface IState {
    whiteTime: string,
    blackTime: string, 
    fenPosition: string
}




