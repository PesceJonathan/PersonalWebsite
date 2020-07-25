import React from 'react';
import { Component } from "react";
import { StatsDiv } from './StatsForGameMode.styles';
import { DonutGraphComponent } from '../../../../Support/Graphs/DonutGraph/DonutGraphComponent';
import { BarChartComponent } from '../../../../Support/Graphs/BarChart/BarChartComponent';

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

//Define styles
interface IProps {
    barGraphData: BarGraphData[],
    donutGraphData: DonutGraphData[],
    title: string
}

