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
                        location={"Montreal"} link={"http://opo.something.com"} linkTitle={"tempsite.com"} animation={<Plane/>}
                        description={[
                            "Developed and debugged new e-commerce site in React.js, Node.js and Next.js.",
                            "Responsible for sole development of admin dashboard for new e-commerce site.",
                            "Contributed to the planning and preparation for an external hackathon.",
                            "R&D project to transform e-commerce site into progressive web app."
                        ]}/>
                    
                    <Experience companyName={"Neptronic"} positionDate={"Sep 2019 - May 2020"} title={"Part Time - Software Developer"} 
                        location={"Montreal"} link={"https://www.istackub.com/"} linkTitle={"istackub.com"} animation={<Fan/>}
                        description={[
                            "Migrating front end of internal software from C# to fully responsive React.js project.",
                            "Leading team of 3 part-time developers to create a React and Node.js dashboard to manage a data center."
                        ]}/>

                    <Experience companyName={"XPO Logistics"} positionDate={"Apr 2019 - Jun 2019"} title={"Internship - Software Developer"} 
                        location={"Lyon"} link={"https://www.xpo.com"} linkTitle={"xpo.com"} animation={<Truck/>}
                        description={[
                            "Autonomous development of custom visuals using D3.js and Typescript for the reporting tool Power BI for the Business Intelligence team at XPO Logistics Europe."
                        ]}/>

                    <Experience companyName={"AdnArt Inc"} positionDate={"Nov 2018 - Jan 2019"} title={"Contract - Software Developer"} 
                        location={"Montreal"} link={"https://www.adnart.com/ca/"} linkTitle={"adnart.com"} animation={<FilledUpAdnArt/>}
                        description={[
                            "Collaborating with other developers to develop C# web service allowing consumers to access stock levels, orders and shipment details of AdNArt.",
                            "Responsible as a group for planning, developing and testing the API."
                        ]}/></ExperiencePage>
            </ProjectPage> 
        </PageSize>
    )
}

const PageSize = styled.div`
    background-color: #1D3557;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 60px;
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
    color: #f1faee;
    font-size: 50px;
    width: 100%;
`

const ExperiencePage = styled.div`
    width: 100%;
    max-width: 840px;
`