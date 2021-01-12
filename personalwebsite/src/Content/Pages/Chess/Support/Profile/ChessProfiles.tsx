import React, { Component } from "react";
import styled from "styled-components";


export class ChessProfile extends Component<IProps> {
    render() {
        let {avatar, profileLink, username, lastOnline, status, followers, joined, location, name, className } = this.props;
        avatar = avatar ?? "https://www.chess.com/bundles/web/images/user-image.007dad08.svg";

        return (
            //@ts-ignore
            <ProfileInformation className={className} onClick={() => {window.location = profileLink;}}>
                <UserIdentifier>
                    <StyledImage src={avatar} alt="Player Icon"/>
                    <div>{username}</div>
                </UserIdentifier>
                <DataContainer>
                    <Data>
                        <Header>Name</Header>
                        <div>{name}</div>
                    </Data> 
                    {
                        location ?
                        <Data>
                            <Header>Location</Header>
                            <div>{location}</div>
                        </Data> 
                        : ""
                    }
                    <Data>
                        <Header>Last Online</Header>
                        <div>{lastOnline}</div>
                    </Data>
                    <Data>
                        <Header>Joined</Header>
                        <div>{joined}</div>
                    </Data>                    
                    <Data>
                        <Header>Status</Header>
                        <div>{status}</div>
                    </Data>
                    <Data>
                        <Header>Followers</Header>
                        <div>{followers}</div>
                    </Data>
                </DataContainer>
                
            </ProfileInformation>
        );
    }
}

const ProfileInformation = styled.div`
    width: 150px;
    background: #f1f1f1;
    padding: 5px 5px;
    border: 1px gray solid;
    border-radius: 10px;
    height: fit-content;
    cursor: pointer;
`

const StyledImage = styled.img`
    border-radius: 6px;
    height: 50px;
    width: 50px;
    margin-right: 5px;
`

const DataContainer = styled.div`
    margin: 0px 10px;
`

const Data = styled.div`
    margin-top: 10px;
    text-align: center;
`

const Header = styled.div`
    border-bottom: 1px lightgray solid;
    color: #777574;
`

const UserIdentifier = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

interface IProps {
    avatar: string | undefined,
    profileLink: string,
    username: string,
    lastOnline: string,
    status: string,
    followers: number,
    joined: string,
    location: string,
    className: string,
    name: string
}