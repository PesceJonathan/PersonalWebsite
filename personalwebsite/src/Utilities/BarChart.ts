import * as d3 from 'd3';

export class BarChart {

    private margins: IMargin;
    private height: number;
    private width: number;
    private id: string;
    private data: BarGraphData[];
    private startAnimationTime: number;

    constructor() {
        this.margins = {top: 10, right: 30, bottom: 30, left: 40};
        this.height = 0;
        this.width = 0;
    
        this.startAnimationTime = 1000;
        this.id = "barGraph";
        this.data = [
            {
                domain: "Best",
                value: 1211,
                color: "#769656"
            },
            {
                domain: "Current",
                value: 1179,
                color: "#b33430"
            }
        ]
    }

    render() {
        //Grab the div that is holding the graph to get it's height and width and use it to define the radius
        let containerDiv: HTMLElement|null = document.getElementById(this.id);
        if (containerDiv) {
            this.height = containerDiv.clientHeight;
            this.width = containerDiv.clientWidth;
        }

        let svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = d3.select("#barGraph")
                                                                            .append("svg")
                                                                            .attr("width", this.width)
                                                                            .attr("height", this.height)
                                                                            .append("g")
                                                                            .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

        //Adjust the width and height to take into consideration the margins
        this.height -= this.margins.bottom + this.margins.top;
        this.width -= this.margins.left + this.margins.right;

        //Get the scales of the function 
        let scales: IScales = this.GetScales();

        //Generate and append the axis to the graph
        this.AppendAxis(svg, scales);
                                                            
        //Add the bars
        svg.selectAll("bars")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("x", (d: BarGraphData) => scales.x(d.domain) ?? "")
            .attr("width", scales.x.bandwidth())
            .attr("fill", (d: BarGraphData) => d.color)
            //Set the initial values to 0 so that the animations will lift them
            .attr("y", (d: BarGraphData) => scales.y(0))
            .attr("height", (d: BarGraphData) => this.height - scales.y(0))
            .transition()
            .duration(this.startAnimationTime)
            .attr("y", (d: BarGraphData) => scales.y(d.value))
            .attr("height", (d: BarGraphData) => this.height - scales.y(d.value));
    }

    private AppendAxis(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scales: IScales) {
        //Append the x-axis
        svg.append("g")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(d3.axisBottom(scales.x))
            .selectAll("text")
            .attr("transform", "rotate(0)")
            .style("text-anchor", "center");

        //Append y-axis
        svg.append("g")
            .call(d3.axisLeft(scales.y).ticks(4));
    }

    private GetScales(): IScales {
        let values: number[] = this.data.map((d:BarGraphData) => d.value);

        let yScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
                        .range([this.height, 0])
                        .domain([(d3.min(values) ?? 0) * 0.95, d3.max(values) ?? 1]);

        let xScale: d3.ScaleBand<string> = d3.scaleBand()
        .range([0, this.width])                
        .domain(this.data.map((d: BarGraphData) => d.domain))
        .padding(0.2);

        return {
            x: xScale,
            y: yScale
        }
    }   
}


interface IMargin {
    top: number,
    right: number,
    bottom: number, 
    left: number
}

interface BarGraphData {
    domain: string,
    value: number,
    color: string
}

interface IScales {
    x: d3.ScaleBand<string>,
    y: d3.ScaleLinear<number, number>
}