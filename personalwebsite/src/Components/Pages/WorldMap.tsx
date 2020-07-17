import React, { Component } from "react";
import { World } from "../Subcomponents/WorldMap/World";
import styled from "styled-components";
import { WorldTooltip } from "../Subcomponents/WorldMap/WorldTooltip";


export class WorldMap extends Component {
    componentDidMount() {
        new World();
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
    position: relative;
    
    > * {
        fill: green;
        stroke: black;
        stroke-opacity: 0.2;
    }
`
