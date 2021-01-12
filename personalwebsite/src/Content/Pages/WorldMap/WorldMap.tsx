import React, { Component } from "react";
import styled from "styled-components";
import { WorldTooltip } from "./Support/Tooltip/WorldTooltip";
import { World } from "./Support/D3World/World";



export class WorldMap extends Component<any, IState> {
    
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: true
        };
    }

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
                {
                    this.state.showModal ? 
                    (
                        <Modal>
                        Not too mobile friendly at the moment due to D3.js interactions, please come visit the site on Desktop!!!
                        </Modal>
                    )
                    :
                    ""
                }
            </WorldMapStyles>
        )
    }
}

interface IState {
    showModal: boolean
}

const Modal = styled.div`
    position: absolute;
    top: calc(50% - 30px);
    background-color: lightgray;
    padding: 5px;
    width: 300px;

    @media (min-width: 900px) {
        display: none;
    }
`

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
