import React from "react";
import styled from "styled-components";
import { Parallax, Background } from 'react-parallax';
import "./JonathanPesce.css";
import { Projects } from "./Support/Projects/Projects";
import { Experiences } from "./Support/Experience/Experiences";

export function JonathanPesce() {

    return (
        <PersonalPage>
            <Parallax blur={{min: -8, max: 15}} bgImage={"https://raw.githubusercontent.com/PesceJonathan/PersonalWebsite/ChessPage/Assets/JonathanBackground.png"} bgImageAlt={"Parallax Background Image"} strength={500}>
                <CoverImage>
                    <MainCoverImageInformation>
                        <NameHeader>Jonathan Pesce</NameHeader>
                        <NameHeader>Computer Science and</NameHeader>
                        <NameHeader>Mathematics Student</NameHeader>
                    </MainCoverImageInformation>
                </CoverImage>
            </Parallax>
            <Experiences/>
            <Projects/>
        </PersonalPage>
    )
}

const PersonalPage = styled.div`
    font-family: 'Montserrat', sans-serif;
`

const CoverImage = styled.div`
    align-items: flex-start;
    display: flex;
    height: 100vh;
    justify-content: flex-end;

    @media (max-width: 480px) {
        justify-content: center;
    }
`

const NameHeader = styled.div`
    @media (max-width: 480px) {
        text-align: center;
    }
`

const MainCoverImageInformation = styled.div`
    color: #f1faee ;
    font-size: 80px;
    margin: 5% 8% 0px 0px;

    @media (max-width: 1440px) {
        font-size: 55px;
    }

    @media (max-width: 1024px) {
        font-size: 45px;
        margin: 10% 8% 0px 0px;
    }

    @media (max-width: 768px) {
        font-size: 40px;
        margin: 10% 8% 0px 0px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        margin: 30% 0px;
    }
`