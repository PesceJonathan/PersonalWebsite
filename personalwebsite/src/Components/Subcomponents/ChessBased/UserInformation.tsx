import React, { Component } from "react";
import styled from "styled-components";

export class UserInformation extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        let {username, rating} = this.props;
        return (
            <Wrapper>
                {username + " (" + rating + ")"}
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
    rating: number|string
}