import React from 'react';
import { Component } from "react";
import { DonutGraph, DonutGraphData } from '../../Utilities/DonutGraphs';
import styled from 'styled-components';

export class DonutGraphComponent extends Component {
    private static graphNumber: number = 0;
    private static baseID: string = "donutGraph";
    private id: string;

    constructor(props: any) {
        super(props);

        this.id = DonutGraphComponent.baseID + DonutGraphComponent.graphNumber;
    }

    componentDidMount() {
        let graph: DonutGraph = new DonutGraph(data, this.id);
        graph.render();
    }

    render() {
        return <DonutDiv style={{height: "300px"}} id={this.id}></DonutDiv>
    }
}

//Define state
interface IState {
    id: string
}

//Styled Components
let DonutDiv = styled.div`
    position: relative;
`

let data: DonutGraphData[] = [
        {
        title: "loss",
        result: 714,
        colour: "#b33430",
    },
    {
        title: "draws",
        result: 56,
        colour: "#a7a6a2",
    },
    {
        title: "wins",
        result: 734,
        colour: "#769656",
    }, 
]