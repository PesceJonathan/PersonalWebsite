import React from "react";
import styled from "styled-components";
import { MapPin, Link } from "react-feather";

export function School({companyName, positionDate, title, description, location, link, linkTitle, animation}: IProps) {
    return (
        <ExperienceContainer>
            <CompanyInformation>
                <CompanyName>{companyName}</CompanyName>
                <PositionDuration>{positionDate}</PositionDuration>
                {animation}
            </CompanyInformation>
            <PositionInformation>
                <PositionTitle>{title}</PositionTitle>
                <PositionDescription>
                    {description} 
                </PositionDescription>
                <PositionDetails>
                    <Detail><MapPin size={20}/>{location}</Detail>
                    <Detail><Link size={20}/><WorkLink onClick={() => { window.location = (link as any); }}>{linkTitle}</WorkLink></Detail>
                </PositionDetails>
            </PositionInformation>
        </ExperienceContainer>
    )
}
    
    interface IProps {
        companyName: string, 
        positionDate: string,
        title: string, 
        description: string, 
        location: string, 
        link: string, 
        animation: JSX.Element,
        linkTitle: string
    }
    
    const WorkLink = styled.span`
        &:hover {
            color: #e63946;
            cursor: pointer;
        }
    `
    
    const ExperienceContainer = styled.div`
        color: #1D3557;
        display: flex;
        font-size: 16px;
        margin: 50px 0px;
    
        @media (max-width: 1024px) {
            flex-direction: column;
        }
    `
    
    const Detail = styled.div`
        align-items: center;
        color: #457b9d;
        display: flex;
        justify-content: flex-start;
        margin-right: 10px;
        margin-bottom: 5px;
        overflow: wrap;
        white-space: normal;
        
        > * {
            margin-right: 5px;
        }
    `
    
    const PositionDetails = styled.div`
        display: flex;
        width: fit-content;
        @media (max-width: 400px) {
            flex-direction: column;
        }
    `
    
    const PositionDescription = styled.div`
        margin-bottom: 20px;
    `
    
    const PositionTitle = styled.div`
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        height: 30px;

        @media (max-width: 1024px) {
            height: fit-content;
            margin-bottom: 5px;
        }
    `
    
    const PositionInformation = styled.div`
    
    `
    
    const PositionDuration = styled.div`
        
    `
    
    const CompanyName = styled.div`
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
    `
    
    const CompanyInformation = styled.div`
        width: 100%;
        @media (min-width: 1024px) {
            width: 400px;
            margin-right: 100px;
        }
    `