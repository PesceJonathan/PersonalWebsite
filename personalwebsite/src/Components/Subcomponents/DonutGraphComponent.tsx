import React from 'react';
import { Component } from "react";
import { DonutGraph, DonutGraphData } from '../../Utilities/DonutGraphs';

export class DonutGraphComponent extends Component {
    
    componentDidMount() {
        let graph: DonutGraph = new DonutGraph(data, "donutGraph");
        graph.render();
    }

    render() {
        return <div style={{height: "300px", position:"relative"}} id="donutGraph"></div>
    }
}


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