import React, { Component } from "react";
import { Timer } from "../Timer/Timer";
import { UserInformation } from "../UserInformation/UserInformation";
import { Wrapper } from "./PlayerInformation.styles";

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

//Define styles
interface IProps {
    username: string,
    rating: number|string,
    time: string
}