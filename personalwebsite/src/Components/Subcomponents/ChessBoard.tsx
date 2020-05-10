import React, { Component } from "react";
import Chessground from 'react-chessground';
import 'react-chessground/dist/assets/chessground.css';
import 'react-chessground/dist/assets/theme.css'; // Or your own chess theme

export class ChessBoard extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Chessground></Chessground>
    }
}