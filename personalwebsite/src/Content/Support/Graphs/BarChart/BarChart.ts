import * as d3 from 'd3';

export class BarChart {
    private margins: IMargin;
    private height: number;
    private width: number;
    private id: string;
    private data: BarGraphData[];
    private startAnimationTime: number;
    private animationDuration: number;
    private Tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

    constructor(data: BarGraphData[], id: string) {
        this.margins = {top: 10, right: 30, bottom: 30, left: 40};
        this.height = 250;
        this.width = 250;
    
        this.startAnimationTime = 1000;
        this.animationDuration = 700;
        this.id = id;
        this.data = data;

    this.Tooltip = d3.select("#" + this.id)
        .append("div")
        .style("display", "none")
        .style("background-color", "rgba(247,247,247,0.85)")
        .style("border", "solid")
        .style("border-color", "blue")
        .style("border-width", "1px")
        .style("border-radius", "3px")
        .style("font-family", "Lucida Grande")
        .style("padding", "5px")
        .style("position", "absolute");
    }

    render() {
        let svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = d3.select("#" + this.id)
                                                                            .append("svg")
                                                                            .attr("viewBox", "0 0 250 250")
                                                                            .append("g")
                                                                            .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

        //Adjust the width and height to take into consideration the margins
        this.height -= this.margins.bottom + this.margins.top;
        this.width -= this.margins.left + this.margins.right;

        //Get the scales of the function 
        let scales: IScales = this.GetScales();

        //Generate and append the axis to the graph
        this.AppendAxis(svg, scales);                       
            
        //Append Hover Bars
        this.AppendHoverBars(svg, scales);

        //Append the bars to the graph
        this.AppendBars(svg, scales);

        //Append Text to the top of the graph
        this.AppendText(svg, scales);
    }

    private AppendText(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scales: IScales) {
        svg.selectAll("scoreText")
            .data(this.data)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", (d: BarGraphData) => (scales.x(d.domain) ?? 0) + scales.x.bandwidth() / 2)
            .attr("y", (d: BarGraphData) => scales.y(d.value) - 5)
            .text((d: BarGraphData) => d.value);
    }

    private AppendHoverBars(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scales: IScales) {
        //Calculate how much space is available for the hover bars
        let spaceNotOccupied = this.width - (this.data.length * scales.x.bandwidth());
        let overlap = (spaceNotOccupied / this.data.length) / 2;

        svg.selectAll("hoverBars")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("id", (d: BarGraphData) => this.id + d.domain + "hover")
            .attr("x", (d: BarGraphData) => (scales.x(d.domain) ?? 0) - overlap / 2)
            .attr("width", scales.x.bandwidth() + overlap)
            .attr("fill", (d: BarGraphData) => d.color)
            .attr("y", (d: BarGraphData) => scales.y(d.value) - overlap / 2)
            .attr("height", (d: BarGraphData) => (this.height) - scales.y(d.value) + overlap / 2)
            .attr("opacity", 0);
    }

    private AppendBars(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scales: IScales) {
        //Add the bars to the graph
        svg.selectAll(".bars")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "bars")
            .attr("x", (d: BarGraphData) => scales.x(d.domain) ?? "")
            .attr("width", scales.x.bandwidth())
            .attr("fill", (d: BarGraphData) => d.color)
            .on("mouseenter", (d: BarGraphData) => d3.select("#" + this.id + d.domain + "hover").interrupt().attr("opacity", 0.25))
            .on("mouseout", (d: BarGraphData) => d3.select("#" + this.id + d.domain + "hover").transition().duration(this.animationDuration).attr("opacity", 0))
            //Set the initial values to 0 so that the animations will lift them
            .attr("y", (d: BarGraphData) => scales.y(scales.min))
            .attr("height", (d: BarGraphData) => this.height - scales.y(scales.min))
            .on("mouseover", (d: BarGraphData) => this.Tooltip.style("display", "block"))
            .on("mousemove", (d: BarGraphData, i, n) => {

                let svgDimension = svg.node()?.getBoundingClientRect().width ?? 0;
                let svgHeight = svg.node()?.getBoundingClientRect().height ?? 0;

                let tooltipWidth: number = this.Tooltip.node()?.offsetWidth ?? 0;
                let tooltipHeight: number = this.Tooltip.node()?.offsetHeight ?? 0;

                let positionLeft: number = (((d3.mouse(n[i])[0])) / 180) * svgDimension - (tooltipWidth / 2);
                let positionRight: number = (((d3.mouse(n[i])[1])) / 250) * svgHeight - tooltipHeight - 5;

                this.Tooltip.html(this.generateTooltipText(d))
                            .style("border-color", d.color)
                            .style("left", positionLeft + "px")
                            .style("top", positionRight + "px");
            })
            .on("mouseleave",(d: BarGraphData) => this.Tooltip.style("display", "none"))
            .transition()
            .duration(this.startAnimationTime)
            .attr("y", (d: BarGraphData) => scales.y(d.value))
            .attr("height", (d: BarGraphData) => this.height - scales.y(d.value));
    }

    private generateTooltipText(d: BarGraphData) {
        let base: string = d.domain + " rating of " + d.value;

        // if (d.date)
        //     base += "</br>Date: May 20th 2020";

        return base;
    }

    private AppendAxis(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scales: IScales) {
        //Append the x-axis
        svg.append("g")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(d3.axisBottom(scales.x).ticks(0))
            .selectAll("text")
            .attr("transform", "rotate(0)")
            .style("text-anchor", "center");

        //Append y-axis
        svg.append("g")
            .call(d3.axisLeft(scales.y).ticks(0));
    }

    private GetScales(): IScales {
        let values: number[] = this.data.map((d:BarGraphData) => d.value);
        let min: number = (d3.min(values) ?? 0) * 0.95;

        //Mutiply the extremes by constants so the min chart is shown and the large one is not at the top of the chart
        let yScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
                        .range([this.height, 0])
                        .domain([min, (d3.max(values) ?? 1) * 1.01]); 

        let xScale: d3.ScaleBand<string> = d3.scaleBand()
        .range([0, this.width])                
        .domain(this.data.map((d: BarGraphData) => d.domain))
        .padding(0.2);

        return {
            x: xScale,
            y: yScale,
            min: min
        }
    }   
}

interface IMargin {
    top: number,
    right: number,
    bottom: number, 
    left: number
}

interface IScales {
    x: d3.ScaleBand<string>,
    y: d3.ScaleLinear<number, number>,
    min: number
}