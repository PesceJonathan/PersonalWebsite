import React from "react";
import styled from "styled-components";
import { Parallax } from 'react-parallax';
import "./JonathanPesce.css";
import { Projects } from "./Support/Projects/Projects";
import { Experiences } from "./Support/Experience/Experiences";
import { Schools } from "./Support/School/Schools";
import { SocialMedia } from "./Support/SocialMedia/SocialMedia";
import { AboutMe } from "./Support/AboutMe/AboutMe";
import Picture from "../../Assets/Grenoble.jpg";
import Budapest from "../../Assets/Budapest.jpg";
import Rome from "../../Assets/Rome.jpg";

export function JonathanPesce() {

    return (
        <PersonalPage>
            <Parallax blur={{min: -8, max: 15}} bgImage={"https://raw.githubusercontent.com/PesceJonathan/PersonalWebsite/ChessPage/Assets/JonathanBackground.png"} bgImageAlt={"Parallax Background Image"} strength={500} className="Lyon">
                <CoverImage>
                    <MainCoverImageInformation>
                        <NameHeader>Jonathan Pesce</NameHeader>
                        <NameDetails>Computer Science and Mathematics Student</NameDetails>
                    </MainCoverImageInformation>
                </CoverImage>
            </Parallax>
            <AboutMe/>
            <SocialMedia/>
            <Parallax bgImage={Picture} bgImageAlt={"Parallax Background Image"} strength={500} className={"Grenoble"}>
                <SecondaryParallax/>
            </Parallax>
            <Projects/>
            <Parallax bgImage={Budapest} bgImageAlt={"Parallax Background Image"} strength={500}>
                <SecondaryParallax/>
            </Parallax>
            <Experiences/>
            <Parallax bgImage={Rome} bgImageAlt={"Parallax Background Image"} strength={500}>
                <SecondaryParallax/>
            </Parallax>
            <Schools/>
        </PersonalPage>
    )
}

const SecondaryParallax = styled.div`
    height: 70vh;
`

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

const NameDetails = styled.div`
    font-size: 30px;

    @media (max-width: 1440px) {
        font-size: 25px;
    }

    @media (max-width: 1024px) {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }

    @media (max-width: 480px) {
        font-size: 15px;
        text-align: center;
    }
`

const MainCoverImageInformation = styled.div`
    color: #f1faee ;
    font-size: 80px;
    margin: 5% 5% 0px 0px;

    @media (max-width: 1650px) {
        font-size: 70px;
    }

    @media (max-width: 1440px) {
        font-size: 50px;
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