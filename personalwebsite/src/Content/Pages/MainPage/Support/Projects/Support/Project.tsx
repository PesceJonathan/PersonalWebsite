import React from "react";
import styled from "styled-components";

export function Project({icon, name, description, link}: IProps) {    
    return (
        //@ts-ignore
        <ProjectCard onClick={() => {window.location = link;}}>
            <FrontFace>
                <Content>
                    <ProjectIcon src={icon}/>
                    <ProjectName>{name}</ProjectName>
                </Content>
            </FrontFace>
            <BackFace>
                <Content>{description}</Content>
            </BackFace>
        </ProjectCard>
    );
}

interface IProps { 
    icon: any,
    name: string,
    description: string,
    link: string
}

const Face = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s;
`

const FrontFace = styled(Face)`
    align-items: center;
    background: #1D3557;
    display: flex;
    justify-content: center;
    z-index: 1;
    transform-origin: bottom;
`

const BackFace = styled(Face)`
    background: #457b9d;
    color: #F1FAEE;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: top;
    transform: translateY(100%) rotateX(90deg);
    font-size: 24px;
`

const ProjectCard = styled.div`
    /* font-family: consolas;  */
    cursor: pointer;
    position: relative;
    height: 200px;
    margin: 0px 10px;
    width: 300px;

    &:hover ${FrontFace} {
        transform: translateY(-100%) rotateX(90deg);
        background: #E63946;
    }

    &:hover ${BackFace} {
        transform: translateY(0) rotateX(0deg);
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
`

const ProjectIcon = styled.img`
    color: white;
    width: 100px;
`

const ProjectName = styled.div`
    margin: 10px 0 0;
    color: #F1FAEE;
    text-align: center;
    font-size: 24px;
`