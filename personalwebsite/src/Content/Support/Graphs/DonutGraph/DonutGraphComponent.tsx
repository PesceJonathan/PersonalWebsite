import React from 'react';
import { Component } from "react";
import styled from 'styled-components';
import { DonutGraph } from './DonutGraphs';

export class DonutGraphComponent extends Component<IProps> {
    private static graphNumber: number = 0;
    private static baseID: string = "donutGraph";
    private id: string;

    constructor(props: any) {
        super(props);

        this.id = DonutGraphComponent.baseID + DonutGraphComponent.graphNumber++;
    }

    componentDidMount() {
        let {data} = this.props;
        let graph: DonutGraph = new DonutGraph(data, this.id);
        graph.render();
    }

    render() {
        return <DonutDiv id={this.id}></DonutDiv>
    }
}



//Define props
interface IProps {
    data: DonutGraphData[]
}

//Styled Components
let DonutDiv = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
`