import React from 'react';
import { Component } from "react";
import { DonutGraph, DonutGraphData } from '../../Utilities/DonutGraphs';

export class DonutGraphComponent extends Component {
    
    componentDidMount() {
        let graph: DonutGraph = new DonutGraph(data, "donutGraph");
        graph.render();
    }

    render() {
        return <div style={{height: "500px"}} id="donutGraph"></div>
    }
}


let data: DonutGraphData[] = [
    {
        title: "wins",
        result: 30,
        colour: "#769656",
    }, 
    {
        title: "loss",
        result: 70,
        colour: "#b33430",
    },
    {
        title: "draws",
        result: 12,
        colour: "#a7a6a2",
    }
]