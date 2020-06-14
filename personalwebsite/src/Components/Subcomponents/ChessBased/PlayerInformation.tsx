import React, { Component } from "react";
import styled from "styled-components";
import { Timer } from "./Timer";
import { UserInformation } from "./UserInformation";

export class PlayerInformation extends Component<IProps> {
    render() {
        let {username, rating, time} = this.props;

        return (
            <Wrapper>
                <UserInformation username={username} rating={rating}/>
                <Timer time={time}/>
            </Wrapper>
        );
    }
}

//Defining Styled-Components
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

interface IProps {
    username: string,
    rating: number|string,
    time: string
}