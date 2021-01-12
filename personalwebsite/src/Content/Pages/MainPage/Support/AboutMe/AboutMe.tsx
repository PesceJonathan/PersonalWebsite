import React from "react";
import styled from "styled-components";
import Me from "../Assets/Me.png";

export function AboutMe() {
    return (
        <PageSize>
            <AboutMeSection>
                <Introduction>
                    <ProfilePicture src={Me}/>
                    <Welcome>Welcome to my site!!!!!</Welcome>
                    <Quote>“To become good at anything you have to know how to apply basic principles. To become great at it, you have to know when to violate those principles” <br/> - Garry Kasparov </Quote>
                </Introduction>
                <AboutMeText>
                    I am a computer science graduate from Dawson College continuing to expand my skill set at Concordia University. On top of that, I am currently working as a web developer 
                    at Bombardier and plan to use this website as a platform to continue developing and show casing my skills. Most of my projects that I create are inspired by my hobbies 
                    and interest such as chess, traveling and data visualization. I plan to work on future projects that are revolved around my other interests such as ESports, artificial 
                    intelligence, game theory and anything else that happens to inspire me! Lastly, as you can clearly tell I am not a designer or an artist so any feedback on anything is 
                    welcomed!!! 
                </AboutMeText>

                <Hint>Try hovering over (or on mobile holding) different elements you see!!</Hint>
            </AboutMeSection>
        </PageSize>
    );
}

const Hint = styled.div`
    color: #e63946;
    text-align: center;
    margin-bottom: 30px;
`

const Introduction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30px;
    max-width: 600px;
`

const ProfilePicture = styled.img`
    border-radius: 50%;
    margin-bottom: 30px;
    width: 200px;
`

const Welcome = styled.div`
    font-size: 32px;

    @media (max-width: 424px) {
       font-size: 26px; 
    }
`

const Quote = styled.div`
    color: #f1faee;
    font-size: 14px;
    text-align: center;
`

const PageSize = styled.div`
    background-color: #1D3557;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 60px;
`

const AboutMeSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 900px;
    margin: 0px 30px;
    color: #f1faee;
    min-height: calc(100vh - 180px);
`

const AboutMeText = styled.div`
    text-align: center;
    margin-bottom: 50px;

    @media (max-width: 425px) {
        text-align: justify;
    }
`