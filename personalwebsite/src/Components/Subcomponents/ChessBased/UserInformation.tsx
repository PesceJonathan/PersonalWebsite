import React, { Component } from "react";
import styled from "styled-components";

export class UserInformation extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        let {username, elo} = this.props;
        return (
            <Wrapper>
                {username + " (" + elo + ")"}
            </Wrapper>
        );
    }
}

//Defining Styled-Components
const Wrapper = styled.div`
    display: flex;
`

interface IProps {
    username: string,
    elo: number|string
}