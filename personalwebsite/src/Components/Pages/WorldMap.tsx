import React, { Component } from "react";
import { World } from "../Subcomponents/WorldMap/World";
import styled from "styled-components";

export class WorldMap extends Component {
    componentDidMount() {
        new World();
    }

    render() {
        return (
            <WorldMapStyles id="WorldMap"/>
        )
    }
}

const WorldMapStyles = styled.div`
    > * {
        fill: green;
        stroke: black;
        stroke-opacity: 0.2;
    }
`
