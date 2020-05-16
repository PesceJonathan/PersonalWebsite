import React from 'react';
import { Component } from "react";
import styled from 'styled-components';
import { DonutGraphComponent } from './DonutGraphComponent';
import { BarChartComponent } from './BarChartComponent';

export class StatsForGameMode extends Component<IProps> {
    render() {
        let { donutGraphData, barGraphData, title } = this.props;
    
        return (
            <StatsDiv>
                <h1>{title}</h1>
                <DonutGraphComponent data={donutGraphData}/>
                <BarChartComponent data={barGraphData}/>
            </StatsDiv>
        );
    }
}

interface IProps {
    barGraphData: BarGraphData[],
    donutGraphData: DonutGraphData[],
    title: string
}

const StatsDiv = styled.div`
    height: 500px;
    width: 250px;
`