import * as d3 from 'd3';
import { PieArcDatum } from 'd3';

export class DonutGraph {
    private data: DonutGraphData[];
    private id: string;
    private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    private outerRadius: number;
    private innerRadius: number;
    private totalGames: number;

    public constructor(data: DonutGraphData[], id: string) {
        this.data = data;
        this.id = id;
        this.outerRadius = 0.8;
        this.innerRadius = 0.5;
        this.totalGames = 0;
        this.data.forEach((elem: DonutGraphData) => this.totalGames += elem.result);

        this.svg = d3.select("#" + this.id)
                    .append("svg");
    }

    public render() {
        let height: number = 0;
        let width: number = 0;
        let radius: number = 0;
        let stroke: string = "white";
        
        //Grab the div that is holding the graph to get it's height and width
        let containerDiv: HTMLElement|null = document.getElementById(this.id);
        if (containerDiv) {
            height = containerDiv.clientHeight;
            width = containerDiv.clientWidth;
            radius = Math.min(width, height) / 2;
        }

        //Set the height and width of the svg and then append a g container to draw the graph
        let svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
        svg = this.svg.attr("height", height)
                    .attr("width", width)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        this.drawDonutChart(svg, radius, stroke);
        this.drawCenterText(svg, radius);
    }

    private drawCenterText(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, radius: number) {
        let y = 0; 
        let length = this.data.reduce((a: DonutGraphData, b: DonutGraphData) => a.result > b.result ? a : b).result.toString().length + 5;
        let fontSize = (radius * this.innerRadius) / length;
        let count = -1;

        this.data.forEach((element: DonutGraphData) => {
            let percentage = ((element.result / this.totalGames) * 100).toFixed(1) + "%";

            let text = svg.append("text")
                .attr("text-anchor", "middle")
                .attr("x", 0)
                .attr("y", fontSize * count++ + "px")
                .attr("fill", element.colour);
            
            text.append("tspan")
                .attr("font-size", fontSize + "px")
                .text(element.result + " ");

            text.append("tspan")
                .attr("font-size", fontSize + "px")
                .text(percentage);

        });
    }

    private drawDonutChart(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, radius: number, stroke: string) {
        let pie = d3.pie<DonutGraphData>()
        .sort(null)
        .value((d: DonutGraphData) => d.result);

        let pieData = pie(this.data);

        //Arc generator
        let arc = d3.arc().innerRadius(radius * this.innerRadius).outerRadius(radius * this.outerRadius);

        //Using the data build the chart
        svg.selectAll("slices")
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", arc as any)
        .attr("fill", (d: PieArcDatum<DonutGraphData>) => d.data.colour)
        .attr("stroke", stroke)
        .style("stroke-width", "1px")
        .style("opacity", 1);
    }
}

export interface DonutGraphData {
    title: string,
    result: number,
    colour: string
}