import React, { Component } from "react";
import Chessground from 'react-chessground';
// import 'react-chessground/dist/assets/theme.css'; // Or your own chess theme
import 'react-chessground/dist/styles/chessground.css';
import { ChessInstance } from "chess.js";
import { PlayerInformation } from "../PlayerInformation/PlayerInformation";
import { ChessEndScoreCard } from "../ScoreCard/ChessEndScoreCard";
import { MoveCard } from "../MoveCard/MoveCard";
import { IGame } from "../../../../../types/chess-com";
import { IMove } from "../../../../../types/ChessPage";
import { Wrapper } from "./ChessBoard.styles";



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
    private timeFormat: number;
    private increment: number;

    constructor(props: IProps) {
        super(props);

        let {game} = this.props;
        let startTime = (parseInt(game.time_control) / 60) + ":00";

        this.chess = new Chess();
        this.moveIndex = 0;

        this.moves = this.retrieveMoves(game.pgn);
        this.times = this.retrieveTimes(game.pgn);
        this.timeFormat = parseInt(game.time_control);
        this.increment = parseInt(game.time_control.split("+")[1] ?? "0")

        this.state = {
            whiteTime: startTime,
            blackTime: startTime,
            fenPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", //Starting position for FEN
            gameEnded: false,
            movesPlayed: []
        }

        this.nextMove = this.nextMove.bind(this);
    }

    componentWillReceiveProps(props: IProps) {
        let {game} = props;
        let startTime = parseInt(game.time_control) / 60 + ":00";

        this.chess = new Chess();
        this.moveIndex = 0;

        this.moves = this.retrieveMoves(game.pgn);
        this.times = this.retrieveTimes(game.pgn);

        this.setState({
            whiteTime: startTime,
            blackTime: startTime,
            fenPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", //Starting position for FEN
            gameEnded: false,
            movesPlayed: []
        });
    }

    /**
     * Everytime the component is redrawn, wait a second to play the next move
     */
    componentDidMount() {
        let { gameEnded } = this.state;

        //Remove the coordinates since the react-chess is broken
        let coords = document.getElementsByTagName("coords");
        while (coords.length !== 0) 
            coords[0].remove();
        

        if (!gameEnded)
            setInterval(this.nextMove, 1000); 
    }

    render() {
        let {game, currentUser} = this.props;
        let {gameEnded, movesPlayed, fenPosition, blackTime, whiteTime} = this.state;            

        return (
            <>
            <MoveCard mobile={true} moves={movesPlayed} timeFormat={this.timeFormat}/>
            <Wrapper>
                <PlayerInformation username={game.black.username} rating={game.black.rating} time={blackTime}/>
                <div className="merida"><Chessground style={{height: "320px", width: "320px"}} coordinates={false} fen={fenPosition} viewOnly={true} /></div>
                <PlayerInformation username={game.white.username} rating={game.white.rating} time={whiteTime}/>
                {gameEnded ? <ChessEndScoreCard white={game.white} black={game.black} currentUser={currentUser}/> : ""}
            </Wrapper>
            <MoveCard moves={movesPlayed} timeFormat={this.timeFormat}/>
            </>
        );
    }

    /**
     * Helper function that is used to update the board for the next move as well
     * as the timers for the player who played.
     */
    private nextMove() {
        //If no more moves then set game to ended
        if (this.moves.length === this.moveIndex) {
            if (!this.state.gameEnded) {
                this.setState({gameEnded: true});
                window.setTimeout(this.props.resetGame, 5000);
            }
            return;
        }

        let {whiteTime, blackTime, movesPlayed} = this.state;

        if (this.moveIndex % 2 === 0) {
            let newTime = this.times[this.moveIndex];
            movesPlayed.push({moves: [this.moves[this.moveIndex]], times: [this.calculateTimeTaken(whiteTime, newTime, this.increment)]})
            whiteTime = newTime;
        } else {
            let newTime = this.times[this.moveIndex];
            let index = Math.floor(this.moveIndex / 2);
            movesPlayed[index].moves.push(this.moves[this.moveIndex]);
            movesPlayed[index].times.push(this.calculateTimeTaken(blackTime, newTime, this.increment))
            blackTime = this.times[this.moveIndex];
        }

        this.chess.move(this.moves[this.moveIndex++]);
        this.setState({whiteTime: whiteTime, blackTime: blackTime, fenPosition: this.chess.fen(), movesPlayed: movesPlayed});
    }

    private calculateTimeTaken(oldTime: string, newTime: string, increment: number) {
        let oldTimeSec: number = this.parseTimeIntoSeconds(oldTime);
        let newTimeSec: number = this.parseTimeIntoSeconds(newTime);

        return Math.ceil((oldTimeSec - (newTimeSec - increment)) * 10) / 10;
    }

    private parseTimeIntoSeconds(time: string) {
        let timeValues: string[] = time.split(':');
        let totalSum: number = 0;
        let numOfTimes: number = timeValues.length - 1;

        for (let i = numOfTimes; i >= 0; i--) {
            totalSum += parseFloat(timeValues[i]) * Math.pow(60,  numOfTimes - i);
        }

        return totalSum;
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
                let timeFormatted: string[] = time[0].split("{[%clk ")[1].slice(0, -2).split(':');
                let hours = parseInt(timeFormatted[0]);
                let minutes = parseInt(timeFormatted[1]);
                let seconds = parseFloat(timeFormatted[2]);
                let finalTime = "";

                if (!hours && hours !== 0) {
                    finalTime += hours + ":";
                    if (minutes < 10)
                        finalTime += "0" + minutes;
                    else 
                        finalTime += minutes + ":";
                } else {
                    finalTime += minutes + ":";
                }

                if (minutes > 0) {
                    if (seconds < 10) {
                        finalTime += "0" + Math.floor(seconds);
                    } else {
                        finalTime += Math.floor(seconds);
                    }
                } else {
                    if (seconds < 10) {
                        finalTime += "0" + seconds;
                    } else {
                        finalTime += seconds;
                    }
                }
                
                times.push(finalTime);
            }
        } while (time);

        return times;
    }
}

//Define props and state
interface IProps {
    game: IGame,
    currentUser: string,
    resetGame: VoidFunction
}

interface IState {
    whiteTime: string,
    blackTime: string, 
    fenPosition: string,
    gameEnded: boolean,
    movesPlayed: IMove[]
}