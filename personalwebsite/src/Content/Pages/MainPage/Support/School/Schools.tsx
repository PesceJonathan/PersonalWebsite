import React from "react";
import styled from "styled-components";
import Concordia from "../Assets/Concordia.svg";
import Dawson from "../Assets/Dawson.png";
import IUT from "../Assets/IUTDeLyon.png";
import { School } from "./Support/School";
import RoyalWest from "../Assets/RoyalWestAcademy.png";


export function Schools() {
    return (
        <PageSize>
            <ProjectPage>
                <Header>School</Header>
                <ExperiencePage>
                    <School companyName={"Concordia University"} positionDate={"Sep 2019 - Current"} title={"Mathematics and Statistics and Computer Applications"} 
                        location={"Montreal"} link={"https://www.concordia.ca/"} linkTitle={"concordia.ca"} animation={CreateImageElement(Concordia)}
                        description={"Studying Computer Applications to continue to enhance my computer science skills and knowledge while studying Mathematics and Statistics to allow me to have the proper knowledge to go into Data Science or AI. Currently in the Co-Op version of the program adding an additional 3 internships to my course load."} />
                    <School companyName={"IUT de Lyon"} positionDate={"Feb 2019 - Jun 2019"} title={"Computer Science"} 
                        location={"Lyon"} link={"https://iut.univ-lyon1.fr/"} linkTitle={"iut.univ-lyon1.fr"} animation={CreateImageElement(IUT)}
                        description={"Exchange program to complete my final semester of my DEC abroad in Lyon where I did around 2 months of studying and 3 months of working. "} />
                    <School companyName={"Dawson College"} positionDate={"Aug 2016 - Jun 2019"} linkTitle={"dawsoncollege.qc.ca"} title={"Computer Science"} 
                        location={"Montreal"} link={"https://www.dawsoncollege.qc.ca/"} animation={CreateImageElement(Dawson)}
                        description={"This program prepares its students to work as a software developer through the intense theoretical and practical work in Computer Science. Students gain experience creating state-of-the-art computer systems that support the needs and goals of modern businesses."} />
                    <School companyName={"Royal West Academy"} positionDate={"Aug 2011 - Jun 2016"} title={"Mathematics and Statistics and Computer Applications"} 
                        location={"Montreal"} link={"http://www.royalwestacademy.com/"} linkTitle={"royalwestacademy.com"} animation={CreateImageElement(RoyalWest)}
                        description={"During my time at Royal West Academy, I participated on the badminton and hockey team. I took part in the high math program and graduated with honors."} />
                </ExperiencePage>
            </ProjectPage> 
        </PageSize>
    )
}

const CreateImageElement = (src: any) => {
    return (
        <SchoolDisplay>
            <SchoolImage src={src}/>
        </SchoolDisplay>
    );
}

const SchoolImage = styled.img`
    width: 200px;
`

const SchoolDisplay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    height: 100px;
    width: 200px;
`

const ProjectPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0px 30px;
`

const Header = styled.div`
    color: #1D3557;
    font-size: 50px;
    width: 100%;
`

const ExperiencePage = styled.div`
    width: 100%;
    max-width: 840px;
`

const PageSize = styled.div`
    background-color: #f1faee;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 60px;
`