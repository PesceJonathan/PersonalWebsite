import React from 'react';
import { Component } from "react";
import { BarChart } from '../../Utilities/BarChart';
import styled from 'styled-components';

export class BarChartComponent extends Component {
    
    componentDidMount() {
        let chart = new BarChart();
        chart.render();
    }

    render() {
        return <BarChartDiv id="barGraph"></BarChartDiv>
    }
}

const BarChartDiv = styled.div`
    height: 300px;
    width: 200px;
`