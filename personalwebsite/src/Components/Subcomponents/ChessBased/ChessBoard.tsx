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

/**
 * TODO for the component
 * 
 * 1. Style the component, ideally with wooden 3D pieces
 * 2. Fix time format
 * 3. Fix timer location
 * 4. Handle end of game
 */

/**
 * React component that is used to display a chessboard at a starting position, then
 * to show a move a second for a given game. The component takes in simply a game object
 * which is just the game description returned by the Chess.com API. 
 * 
 * @author Jonathan Pesce
 */
export class ChessBoard extends Component<IProps, IState> {
    private moves: string[];
    private times: string[];
    private chess: ChessInstance;
    private moveIndex: number;

    constructor(props: IProps) {
        super(props);

        let {game} = this.props;
        let startTime = parseInt(game.time_control) / 60 + ":00";

        this.chess = new Chess();
        this.moveIndex = 0;

        this.moves = this.retrieveMoves(game.pgn);
        this.times = this.retrieveTimes(game.pgn);

        this.state = {
            whiteTime: startTime,
            blackTime: startTime,
            fenPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" //Starting position for FEN
        }

        this.nextMove = this.nextMove.bind(this);
    }

    /**
     * Everytime the component is redrawn, wait a second to play the next move
     */
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

    /**
     * Helper function that is used to update the board for the next move as well
     * as the timers for the player who played.
     */
    private nextMove() {
        let {whiteTime, blackTime} = this.state;

        if (this.moveIndex % 2 === 0) {
            whiteTime = this.times[this.moveIndex];
        } else {
            blackTime = this.times[this.moveIndex];
        }

        this.chess.move(this.moves[this.moveIndex++]);
        this.setState({whiteTime: whiteTime, blackTime: blackTime, fenPosition: this.chess.fen()});
    }
    
    /**
     * Using chess API retrieve all the different moves played in the game and 
     * return it as an array.
     * 
     * @param pgn PGN describing the game
     */
    private retrieveMoves(pgn: string): string[] {
        this.chess.load_pgn(pgn);
        let moves: string[] = this.chess.history();
        this.chess.reset();
        return moves;
    }

    /**
     * Using regex, grab all of the different clock times for each move
     * and return it as an array.
     * 
     * @param pgn PGN describing the game
     */
    private retrieveTimes(pgn: string): string[] {
        let regex: RegExp = /{\[%clk [0-9]:[0-5][0-9]:[0-5][0-9]\.?[0-9]?]}/g;
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

//Define props and state
interface IProps {
    game: IGame
}

interface IState {
    whiteTime: string,
    blackTime: string, 
    fenPosition: string
}