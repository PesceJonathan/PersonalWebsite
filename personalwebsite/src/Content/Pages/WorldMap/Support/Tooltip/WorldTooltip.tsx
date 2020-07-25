import React from "react";
import styled from "styled-components";

export function WorldTooltip() {
    return (
        <TooltipContainer id="WorldMapTooltip">
            <ImageContainer>
                <Image id="WorldMapToolTipImage" src="https://raw.githubusercontent.com/PesceJonathan/PersonalWebsite/ChessPage/Countries/Denmark/Copenhagen.jpg"/>    
            </ImageContainer>
            <Information>
                <Name id="WorldMapToolTipName">Copenhague</Name>
                <Description id="WorldMapToolTipDescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Description>
            </Information>
        </TooltipContainer>
    )
}

const TooltipContainer = styled.div`
    position: absolute;
    border-radius: 20px;
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 1);
    overflow: hidden;
    background-color: white;
    display: none;
`

const Information = styled.div`
    min-height: 200px;
    width: 246px;
    padding: 10px;
`

const Name = styled.div`
    font-weight: bold;
    font-size: 20px;
`

const Description = styled.div`
    padding-top: 5px;
`

const ImageContainer = styled.div`
    background-color: black;
    display: flex;
    justify-content: center;
`

const Image = styled.img`
    height: 200px;
    max-width: 266px;
    width: auto;
`
