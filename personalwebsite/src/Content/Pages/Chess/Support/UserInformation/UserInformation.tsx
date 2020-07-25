import React, { Component } from "react";
import { Wrapper } from "./UserInformation.styles";

export class UserInformation extends Component<IProps> {
    render() {
        let {username, rating} = this.props;
        return (
            <Wrapper>
                {username + " (" + rating + ")"}
            </Wrapper>
        );
    }
}

//Define styles
interface IProps {
    username: string,
    rating: number|string
}