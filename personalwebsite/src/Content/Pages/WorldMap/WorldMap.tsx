import React, { Component } from "react";
import styled from "styled-components";
import { WorldTooltip } from "./Support/Tooltip/WorldTooltip";
import { World } from "./Support/D3World/World";



export class WorldMap extends Component {
    componentDidMount() {
        new World();
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <WorldMapStyles id="WorldMap">
                <WorldTooltip/>
            </WorldMapStyles>
        )
    }
}


const WorldMapStyles = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    overflow: hidden !important;
    
    > * {
        fill: #878787;
        stroke: #595959;
        stroke-opacity: 1;
        stroke-width: 0.15px;
    }
`
