import React from "react";
import styled from "styled-components";
import { Experience } from "./Support/Experience";

export function Experiences() {
    return (
        <PageSize>
            <ExperiencePage>
                <Experience/>
            </ExperiencePage>
        </PageSize>
    )
}

const ExperiencePage = styled.div`
    width: 840px;
`

const PageSize = styled.div`
    background-color: #1D3557;
    display: flex;
    justify-content: center;
    width: 100%;
`