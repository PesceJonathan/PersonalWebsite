import React, { Component } from "react";
import styled from "styled-components";

export class Timer extends Component<IProps> {
    render() {
        return <TimerDiv><div>{this.props.time}</div></TimerDiv>  
    }
}

//Defining Styled-Components
const TimerDiv = styled.div`
    border: 1px solid black;
    display: flex;
    width: fit-content;
    background-color: lightgrey;
    width: 70px;
    height: 20px;
    border-radius: 5px;

    font-size: 18px;
    font-weight: 500;

    align-items: center;
    justify-content: center;
    margin: 5px 0px;
`

//Defining Types
interface IProps {
    time: string
}