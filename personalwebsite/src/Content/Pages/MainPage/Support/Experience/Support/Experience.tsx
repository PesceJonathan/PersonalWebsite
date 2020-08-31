import React from "react";
import styled from "styled-components";
import { Plane } from "../WorkAnimations/Plane";
import {MapPin, Link} from "react-feather"; 

export function Experience() {
    return (
        <ExperienceContainer>
            <CompanyInformation>
                <CompanyName>Bombardier</CompanyName>
                <PositionDuration>June 1st 2019 - current</PositionDuration>
                <Plane/>
            </CompanyInformation>
            <PositionInformation>
                <PositionTitle>Fulltime - Software Developer Intern</PositionTitle>
                <PositionDescription>
                    Working as an intern Software Developer Intern within a large digital team mainly contributing pages and bug fixs to the new e-commerce site and eventually 
                    individually creating a admin dashboard for the site. The sites were React based using Next.js working in a sprint. 
                </PositionDescription>
                <PositionDetails>
                    <Detail><MapPin size={20}/>Montreal</Detail>
                    <Detail><Link size={20}/>http://opo.something.com</Detail>
                </PositionDetails>
            </PositionInformation>
        </ExperienceContainer>
    )
}

const ExperienceContainer = styled.div`
    color: #f1faee;
    display: flex;
    font-size: 16px;
`

const Detail = styled.div`
    align-items: center;
    color: #a8dadc;
    display: flex;
    justify-content: center;
    margin-right: 10px;
    
    > * {
        margin-right: 5px;
    }
`

const PositionDetails = styled.div`
    display: flex;
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
    height: 30px;
`

const CompanyInformation = styled.div`
    width: 400px;
    margin-right: 100px;
`