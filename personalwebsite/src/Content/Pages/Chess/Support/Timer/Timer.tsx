import React, { Component } from "react";
import { TimerDiv } from "./Timer.styles";

export class Timer extends Component<IProps> {
    render() {
        return <TimerDiv><div>{this.props.time}</div></TimerDiv>  
    }
}

//Defining Types
interface IProps {
    time: string
}