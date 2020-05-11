import React, { Component } from "react";
import Chessground from 'react-chessground';
import 'react-chessground/dist/assets/chessground.css';
import 'react-chessground/dist/assets/theme.css'; // Or your own chess theme
import styled from "styled-components";
import { PlayerInformation } from "./PlayerInformation";
import { IGame } from "../../../types/chess-com";
import { ChessInstance } from "chess.js";


//Issue with typescript for now: https://github.com/jhlywa/chess.js/issues/208
//May be able to fix in the future
const Chess = require('chess.js');

export class ChessBoard extends Component<IProps, any> {
    private moves: string[];
    private times: string[];
    private chess: ChessInstance;
    private moveIndex: number;

    constructor(props: any) {
        super(props);

        let {game} = this.props;
        this.chess = new Chess();

        let startTime = parseInt(game.time_control) / 60 + ":00";
        this.moves = this.retrieveMoves(game.pgn);
        this.times = this.retrieveTimes(game.pgn);
        this.moveIndex = 0;

        this.state = {
            whiteTime: startTime,
            blackTime: startTime,
            fenPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        }

        this.nextMove = this.nextMove.bind(this);
    }

    componentDidMount() {
        setInterval(this.nextMove, 1000);
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

    private nextMove() {
        debugger;
        let {whiteTime, blackTime, fenPosition} = this.state;

        if (this.moveIndex % 2 == 0) {
            whiteTime = this.times[this.moveIndex];
        } else {
            blackTime = this.times[this.moveIndex];
        }

        this.chess.move(this.moves[this.moveIndex++]);
        this.setState({whiteTime: whiteTime, blackTime: blackTime, fenPosition: this.chess.fen()});
    }
    
    private retrieveMoves(pgn: string): string[] {
        this.chess.load_pgn(pgn);
        let moves: string[] = this.chess.history();
        this.chess.reset();
        return moves;
    }

    private retrieveTimes(pgn: string): string[] {
        let regex: RegExp = new RegExp("{\[%clk [0-9]:[0-5][0-9]:[0-5][0-9].[0-9]]}");
        let times: string[] = [];
        let time: RegExpExecArray|null;

        do {
            time = regex.exec(pgn);
            if (time) {
                let timeFormatted: string = time[0].split("{[%clk ")[1];
                console.log(timeFormatted);
                times.push(timeFormatted.slice(0, -2));
            }
        } while (time);

        return times;
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




