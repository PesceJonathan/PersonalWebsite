import React from 'react';
import { Component } from "react";
import styled from 'styled-components';
import { BarChart } from './BarChart';

export class BarChartComponent extends Component<IProps> {
    private static number: number = 0;
    private id: string;

    constructor(props: IProps) {
        super(props);

        this.id = "barGraph" + BarChartComponent.number++;
    }

    componentDidMount() {
        let {data} = this.props;

        let chart = new BarChart(data, this.id);
        chart.render();
    }

    render() {
        return <BarChartDiv id={this.id}></BarChartDiv>
    }
}

interface IProps {
    data: BarGraphData[]
}

const BarChartDiv = styled.div`
    height: 50%;
    width: 100%;
    position: relative;
`