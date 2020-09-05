import React from "react";
import styled from "styled-components";
import { Experience } from "./Support/Experience";
import { Plane } from "./WorkAnimations/Plane";
import { Fan } from "./WorkAnimations/Fan";
import { Truck } from "./WorkAnimations/Truck";
import { FilledUpAdnArt } from "./WorkAnimations/FilledUpAdnArt";

export function Experiences() {
    return (
        <PageSize>
            <ProjectPage>
                <Header>Experiences</Header>
                <ExperiencePage>
                    <Experience companyName={"Bombardier"} positionDate={"Jun 2020 - Current"} title={"Internship/Part Time - Software Developer Intern"} 
                        location={"Montreal"} link={"http://opo.something.com"} animation={<Plane/>}
                        description={"Working as an intern Software Developer Intern within a large digital team mainly contributing pages and bug fixs to the new e-commerce site and eventually individually creating a admin dashboard for the site. The sites were React based using Next.js working in a sprint."}/>
                    
                    <Experience companyName={"Neptronic"} positionDate={"Sep 2019 - May 2020"} title={"Part Time - Software Developer"} 
                        location={"Montreal"} link={"https://www.istackub.com/"} animation={<Fan/>}
                        description={"Tasked with working with the development team to begin migrating the companies front end of their internal software from a C# MVC project to a fully responsive React.js project. Then transitioned into leading a team of 3 other part time developers in creating a React and Node.js based dashboard used to manage a data center."}/>

                    <Experience companyName={"XPO Logistics"} positionDate={"Apr 2019 - Jun 2019"} title={"Internship - Software Developer"} 
                        location={"Lyon"} link={"https://www.xpo.com"} animation={<Truck/>}
                        description={"Autonomous development of custom visuals for the reporting tool Power BI, which are to be used by the Business Intelligence team at XPO Logistics Europe. These visuals were developed using TypeScript and the data visualization library, D3.js."}/>

                    <Experience companyName={"AdnArt Inc"} positionDate={"Nov 2018 - Jan 2019"} title={"Contract - Software Developer"} 
                        location={"Montreal"} link={"https://www.adnart.com/ca/"} animation={<FilledUpAdnArt/>}
                        description={"Collaborating with other developers in order to develop a C# based SOAP API allowing other companies to access the stock levels, thier orders and their shipments statsuses of AdNArt products. Responsible as a group for planning, developing and testing the application."}/>
                </ExperiencePage>
            </ProjectPage> 
        </PageSize>
    )
}

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
    color: #f1faee;
    font-size: 50px;
    width: 100%;
`

const ExperiencePage = styled.div`
    width: 100%;
    max-width: 840px;
`

const PageSize = styled.div`
    background-color: #1D3557;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 60px;
`