import React from "react";
import { Project } from "./Support/Project";
import ChessPawn from "../Assets/ChessPawn.svg";
import WorldMap from "../Assets/WorldMap.svg";
import Snake from "../Assets/Snake.svg";
import styled from "styled-components";
import Chart from "../Assets/Chart.svg";
import Fill from "../Assets/Fill.svg";

export function Projects() {
    return (
        <PageSize>
            <ProjectsContainer>
                <Header>Projects</Header>
                <Project icon={WorldMap} name={"Traveled Locations"} description={"An interactive world map that shows the many different cities I have been traveled to! All done using D3.js and javascript!"} link={"http://jonathanpesce.com/#/worldMap"}/>
                <Project icon={ChessPawn} name={"Chess Dashboard"} description={"One page dashboard showing off my Chess.com stats with the last few games I have played!"} link={"http://jonathanpesce.com/#/chess"}/>
                <Project icon={Chart} name={"Horse Racer"} description={"Power BI custom visualization that is a horse racing graph with many customizable settings!"} link={"https://github.com/PesceJonathan/PowerBI-HorseRace"}/>
                <Project icon={Fill} name={"Icon Fill"} description={"Power BI custom visualization that takes an Icon and will represent a percentage by filling the icon!"} link={"https://github.com/PesceJonathan/IconFill"}/>
                <Project icon={Snake} name={"Snake Game"} description={"Snake game with multiple levels that was done for a TP assignment for my JS class at IUT de Lyon."} link={"http://tp3javascript.herokuapp.com/Snake/"}/>
                <EmptyProject/>
                <EmptyProject/>
            </ProjectsContainer>
        </PageSize>
    )
}

const PageSize = styled.div`
    background-color: #f1faee;
    display: flex;
    justify-content: center;
    padding-top: 60px;
    width: 100%;
    min-height: 100vh;
`

const Header = styled.div`
    color: #1D3557;
    font-size: 50px;
    width: 100%;
`

const ProjectsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px 30px;
    max-width: 1200px;

    > * {
        margin-bottom: 60px;
    }

    @media (max-width: 700px) {
        justify-content: center;
    }
`
const EmptyProject = styled.div`
    width: 300px;
    height: 0px;
    margin: 0px 10px;
`

//http://tp3javascript.herokuapp.com/Snake/
//http://tp3javascript.herokuapp.com/TP4/TP4.html