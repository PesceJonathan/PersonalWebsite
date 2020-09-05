import React from "react";
import styled from "styled-components";

export function SocialMedia() {
    return (
        <List>
            <SocialMediaPaltform background={"#3b5999"}>
                <a href="https://www.facebook.com/PesceTheFish/">
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares className="fa fa-facebook" aria-hidden="true"></Squares>
                </a>
            </SocialMediaPaltform>
            <SocialMediaPaltform background={"#FF0000"}>
                <a href="https://www.youtube.com/user/jonathanthefish/">
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares className="fa fa-youtube" aria-hidden="true"></Squares>
                </a>
            </SocialMediaPaltform>
            <SocialMediaPaltform background={"#0077B5"}>
                <a href="https://www.linkedin.com/in/jonathan-pesce-aa9665197/">
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares className="fa fa-linkedin" aria-hidden="true"></Squares>
                </a>
            </SocialMediaPaltform>
            <SocialMediaPaltform background={"#E4405F"}>
                <a href="https://www.instagram.com/pesce.jonathan/">
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares className="fa fa-instagram" aria-hidden="true"></Squares>
                </a>
            </SocialMediaPaltform>
            <SocialMediaPaltform background={"#000"}>
                <a href="https://github.com/PesceJonathan/">
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares></Squares>
                    <Squares className="fa fa-github" aria-hidden="true"></Squares>
                </a>
            </SocialMediaPaltform>
        </List>
    );
}

const List = styled.ul`
    position: relative;
    margin: 0;
    padding: 60px 0px;
    height: fit-content;
    display: flex;
    align-items: flex-end; 
    justify-content: center;
    background-color: #1D3557;
    transform-style: preserve-3d;
    flex-wrap: wrap;
`
const Squares = styled.span`
    position: absolute;
    top: 0;
    left: 0; 
    width: 100%;
    height: 100%;
    background: #457b9d;
    transition: 0.5s;
    display: flex !important;
    align-items: center; 
    justify-content: center;
    color: #f1faee;
    font-size: 30px !important;
    transition: 0.2s;
`

interface SocialProps {
    background: string
}

const SocialMediaPaltform = styled.li<SocialProps>`
    position: relative; 
    list-style: none;
    width: 60px;
    height: 60px;
    margin: 0 30px;
    transform:  rotate(-25deg) skew(25deg);
    background-color: #457b9d;
    
    @media (max-width: 350px) {
        margin: 0 20px;
    }

    &:before {
        position: absolute;
        content: '';
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 10px;
        background: #304f62;
        transform-origin: top;
        transform: skewX(-41deg);
    }

    &:after {
        position: absolute;
        content: '';
        top: 0px;
        left: -9px;
        width: 9px;
        height: 100%;
        background: #304f62;
        transform-origin: right;
        transform: skewY(-49deg);
    }

    > a:hover span {
        z-index: 1000;
        transition: 0.5s;
        background-color: ${props => props.background};
        color: #fff;
        box-shadow: -1px 1px 1px rgba(0,0,0,0.05);
    }

    > a:hover span:nth-child(5)
    {
        transform: translate(40px, -40px);
        opacity: 1;
    }

    > a:hover span:nth-child(4)
    {
        transform: translate(30px, -30px);
        opacity: .8;
    }

    > a:hover span:nth-child(3)
    {
        transform: translate(20px, -20px);
        opacity: .6;
    }

    > a:hover span:nth-child(2)
    {
        transform: translate(10px, -10px);
        opacity: .4;
    }

    > a:hover span:nth-child(1)
    {
        transform: translate(0px, 0px);
        opacity: .5;
    }
`

