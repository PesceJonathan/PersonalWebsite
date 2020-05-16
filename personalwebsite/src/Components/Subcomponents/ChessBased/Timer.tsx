import React, { Component } from "react";
import styled from "styled-components";

export class Timer extends Component<IProps> {
    render() {
        return <TimerDiv>{this.props.time}</TimerDiv>  
    }
}

//Defining Styled-Components
const TimerDiv = styled.div`
    border: 1px solid black;
    display: flex;
    width: fit-content;
`
//Defining Types
interface IProps {
    time: string
}