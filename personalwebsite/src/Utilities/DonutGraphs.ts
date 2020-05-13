import * as d3 from 'd3';
import { PieArcDatum } from 'd3';

export class DonutGraph {
    private data: DonutGraphData[];
    private id: string;
    private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    private hoverRadius: number;
    private outerRadius: number;
    private innerRadius: number;
    private totalGames: number;
    private hoverOpacity: number;
    private expandedHoverArc: any;
    private hiddenHoverArc: any;

    public constructor(data: DonutGraphData[], id: string) {
        this.data = data;
        this.id = id;
        this.hoverRadius = 0.9;
        this.outerRadius = 0.8;
        this.innerRadius = 0.5;
        this.hoverOpacity = 0.25;
        this.totalGames = 0;
        this.data.forEach((elem: DonutGraphData) => this.totalGames += elem.result);

        //Append an svg to the div that will be used to draw our graph on
        this.svg = d3.select("#" + this.id)
                    .append("svg");
    }

    public render() {
        let height: number = 0;
        let width: number = 0;
        let radius: number = 0;
        let stroke: string = "white";
        
        //Grab the div that is holding the graph to get it's height and width and use it to define the radius
        let containerDiv: HTMLElement|null = document.getElementById(this.id);
        if (containerDiv) {
            height = containerDiv.clientHeight;
            width = containerDiv.clientWidth;
            radius = Math.min(width, height) / 2;
        }

        //Set once the expanded and hidden hover arc
        this.expandedHoverArc = d3.arc().innerRadius(radius * this.outerRadius).outerRadius(radius * this.hoverRadius) as any;
        this.hiddenHoverArc = d3.arc().innerRadius(radius * this.outerRadius).outerRadius(radius * this.outerRadius) as any;

        //Set the height and width of the svg and then append a g container to draw the graph
        let svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
        svg = this.svg.attr("height", height)
                    .attr("width", width)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        //Draw the graph and the text with the calculated values
        this.drawDonutChart(svg, radius, stroke, this.innerRadius, this.outerRadius, 1, false);
        this.drawDonutChart(svg, radius, stroke, this.outerRadius, this.outerRadius, this.hoverOpacity, true);
        this.drawCenterText(svg, radius);
    }

    /**
     * Draws the three different values (wins, draws and lost) in the center of the circle
     * seperated by small gray lines
     * 
     * @param svg SVG to append the text in
     * @param radius Radius of the main large circle
     */
    private drawCenterText(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, radius: number) { 
        let length: number = this.data.reduce((a: DonutGraphData, b: DonutGraphData) => a.result > b.result ? a : b).result.toString().length;
        let fontSize: number = radius / 6 - (1 * (length - 3));
        let count: number = -1;
        let offset: number = radius / 50;

        //Draw the lines seperating the text elements
        let x = radius * this.innerRadius * 0.85;
        let y = fontSize / 2 + offset;
        this.drawLine(svg, x, y);
        this.drawLine(svg, x, -y);

        //Increase the offset to add space between the lines and text (done in specific order to replicate chess.com)
        offset *= 1.9;
        this.drawTextForElement(svg, this.data[2], fontSize, offset, count++);
        this.drawTextForElement(svg, this.data[0], fontSize, offset, count++);
        this.drawTextForElement(svg, this.data[1], fontSize, offset, count++);
    }

    /**
     * Draws a straight horizontal line on the given coordinates
     * 
     * @param svg SVG to append the line onto
     * @param x 1/2 the width of the line 
     * @param y Height position of the line
     */
    private drawLine(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, x: number, y: number) {
        svg.append("line")
            .attr("x1", -x)
            .attr("y1", y)
            .attr("x2", x)
            .attr("y2", y)
            .attr("stroke-width", 0.5)
            .attr("stroke", "#a7a6a2");
    }

    /**
     * Draws a single text element in the center of the circle
     * 
     * @param svg SVG element to append the text onto
     * @param element The data to be displayed
     * @param fontSize font size of the text
     * @param offset offset to be added to the position of the text
     * @param count the count of the element being displayed
     */
    private drawTextForElement(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, element: DonutGraphData, fontSize: number, offset: number, count: number) {
        let percentage = ((element.result / this.totalGames) * 100).toFixed(1) + "%";

        let text = svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", (offset + fontSize) * count + (fontSize * 0.33333) + "px") //Honestly, it works it works, TODO is fix to be better
            .attr("fill", element.colour);
        
        //Add the total count
        text.append("tspan")
            .attr("font-size", fontSize + "px")
            .attr("font-weight", "700")
            .attr("font-family", "Segoe UI")
            .text(element.result + " ");

        //Add the count as a percentage smaller than the total count
        text.append("tspan")
            .attr("font-size", fontSize * 0.65 + "px")
            .attr("font-family", "Segoe UI")
            .text(percentage);
    }

    /**
     * Draws a donut graph based on the given data
     * 
     * @param svg 
     * @param radius 
     * @param stroke 
     */
    private drawDonutChart(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, radius: number, stroke: string, innerRadius:number, outerRadius: number, opacity: number, hover: boolean) {
        let pie = d3.pie<DonutGraphData>()
        .sort(null)
        .value((d: DonutGraphData) => d.result);

        let pieData = pie(this.data);

        //Arc generator
        let arc = d3.arc().innerRadius(radius * innerRadius).outerRadius(radius * outerRadius);

        //Using the data build the chart
        svg.selectAll("slices")
            .data(pieData)
            .enter()
            .append("path")
            .attr("id", (d: PieArcDatum<DonutGraphData>) => hover ? this.id + d.data.title + "hover" : this.id + d.data.title)
            .attr("d", arc as any)
            .attr("fill", (d: PieArcDatum<DonutGraphData>) => d.data.colour)
            .attr("stroke", stroke)
            .on("mouseenter", hover ? () => {} : (d: PieArcDatum<DonutGraphData>) => {d3.select("#" + this.id + d.data.title + "hover").attr("d", this.expandedHoverArc); console.log("Enter")})
            .on("mouseout", hover ? () => {} : (d: PieArcDatum<DonutGraphData>) => {d3.select("#" + this.id + d.data.title + "hover").attr("d", this.hiddenHoverArc); console.log("Exit");})
            .style("stroke-width", "1px")
            .style("opacity", opacity);
    }
}

export interface DonutGraphData {
    title: string,
    result: number,
    colour: string
}