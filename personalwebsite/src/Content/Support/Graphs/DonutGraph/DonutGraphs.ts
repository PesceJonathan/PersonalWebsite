import * as d3 from 'd3';
import { PieArcDatum } from 'd3';

export class DonutGraph {
    private data: DataWithPercentage[];
    private id: string;
    private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    private hoverRadius: number;
    private outerRadius: number;
    private innerRadius: number;
    private hoverOpacity: number;
    private expandedHoverArc: any;
    private hiddenHoverArc: any;
    private Tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private width: number;
    private height: number;
    private loadAnimation: number;

    public constructor(data: DonutGraphData[], id: string) {
        //Set the constants
        this.id = id;
        this.hoverRadius = 0.95;
        this.outerRadius = 0.85;
        this.innerRadius = 0.55;
        this.hoverOpacity = 0.25;
        this.width = 250;
        this.height = 250;
        this.loadAnimation = 1000;

        //Calculate the percentage for each element of data
        let totalGames = 0;
        data.forEach((elem: DonutGraphData) => totalGames += elem.result);

        this.data = [];
        data.forEach((d: DonutGraphData) => this.data.push({...d, percentage: ((d.result / totalGames) * 100).toFixed(1)}))

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
            

        //Append an svg to the div that will be used to draw our graph on
        this.svg = d3.select("#" + this.id)
                    .append("svg")
                    .attr("viewBox", "0 0 250 250");
    }

    public render() {
        let radius: number = 125;
        let stroke: string = "white";

        //Set once the expanded and hidden hover arc
        this.expandedHoverArc = d3.arc().innerRadius(radius * this.outerRadius - 0.1).outerRadius(radius * this.hoverRadius) as any;
        this.hiddenHoverArc = d3.arc().innerRadius(radius * this.outerRadius - 0.1).outerRadius(radius * this.outerRadius) as any;

        //Set the height and width of the svg and then append a g container to draw the graph
        let svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
        svg = this.svg.append("g")
                    .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

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
        let length: number = this.data.reduce((a: DataWithPercentage, b: DataWithPercentage) => a.result > b.result ? a : b).result.toString().length;
        let fontSize: number = radius / 6 - (1 * (length - 3));
        let count: number = -1;
        let offset: number = radius / 50;

        //Draw the lines seperating the text elements
        let x = radius * this.innerRadius * 0.85;
        let y = fontSize / 2 + offset;
        this.drawLine(svg, x, y);
        this.drawLine(svg, x, -y);

        this.Tooltip.style("font-size", fontSize / 1.5 + "px");

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
    private drawTextForElement(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, element: DataWithPercentage, fontSize: number, offset: number, count: number) {
        let percentage = element.percentage + "%";

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
     * Draws a donut graph based on the given data and adds the drawing animations
     * 
     * @param svg SVG to append the graph too
     * @param radius Radius of the graph
     * @param stroke Stroke size of the divsors of sections
     */
    private drawDonutChart(svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, radius: number, stroke: string, innerRadius:number, outerRadius: number, opacity: number, hover: boolean) {
        let pie: d3.Pie<any, DataWithPercentage> = d3.pie<DataWithPercentage>()
                                                    .sort(null)
                                                    .value((d: DataWithPercentage) => d.result);

        //Format the data properly for the pie chart                                              
        let pieData: d3.PieArcDatum<DataWithPercentage>[] = pie(this.data);

        //Arc generator
        let arc = d3.arc<PieArcDatum<DataWithPercentage>>().innerRadius(radius * innerRadius).outerRadius(radius * outerRadius);

        //Using the data build the chart
        let arcs = svg.selectAll("slices")
            .data(pieData)
            .enter()
            .append("path")
            .attr("id", (d: PieArcDatum<DataWithPercentage>) => hover ? this.id + d.data.title + "hover" : this.id + d.data.title)
            .attr("fill", (d: PieArcDatum<DataWithPercentage>) => d.data.colour)
            .attr("stroke", stroke)
            .style("stroke-width", "1px")
            .style("opacity", opacity)
            //Add events for dealing with the different hover events
            .on("mouseenter", hover ? () => {} : (d: PieArcDatum<DataWithPercentage>) => d3.select("#" + this.id + d.data.title + "hover").interrupt().attr("d", this.expandedHoverArc))
            .on("mouseout", hover ? () => {} : (d: PieArcDatum<DataWithPercentage>) => d3.select("#" + this.id + d.data.title + "hover").transition().duration(500).attr("d", this.hiddenHoverArc))
            .on("mouseover", hover ? () => {} : (d: PieArcDatum<DataWithPercentage>) => this.Tooltip.style("display", "block"))
            .on("mousemove", hover ? () => {} : (d: PieArcDatum<DataWithPercentage>, i, n) => {

                let svgDimension = this.svg.node()?.getBoundingClientRect().width ?? 0;

                let tooltipWidth: number = this.Tooltip.node()?.offsetWidth ?? 0;
                let tooltipHeight: number = this.Tooltip.node()?.offsetHeight ?? 0;

                let positionLeft: number = (((d3.mouse(n[i])[0]) + 125) / 250) * svgDimension - tooltipWidth / 2;
                let positionRight: number = (((d3.mouse(n[i])[1]) + 125) / 250) * svgDimension - tooltipHeight - 5;

                this.Tooltip.html(this.generateTooltipText(d))
                            .style("border-color", d.data.colour)
                            .style("left", positionLeft + "px")
                            .style("top", positionRight + "px");
            })
            .on("mouseleave", hover ? () => {} : (d: PieArcDatum<DataWithPercentage>) => this.Tooltip.style("display", "none"));

        //Add the animations to the pie chart
        if (!hover)
            this.addStartAnimations(pie, arc, arcs);
    }

    /**
     * 
     * @param pie 
     * @param arc 
     * @param arcsObject 
     */
    private addStartAnimations(pie: d3.Pie<any, DataWithPercentage>, arc: d3.Arc<any, d3.PieArcDatum<DataWithPercentage>>, arcsObject:  d3.Selection<SVGPathElement, d3.PieArcDatum<DataWithPercentage>, SVGGElement, unknown>) {
        //Adding the load animations
        let angleInterpolation = d3.interpolate(pie.startAngle()(this.data), pie.endAngle()(this.data));
        let outerRadiusInterpolation = d3.interpolate(0, this.outerRadius);
        let innerRadiusInterpolation = d3.interpolate(0, this.innerRadius);

        arcsObject.transition()
            .duration(this.loadAnimation)
            //@ts-ignore Type issue not sure how to resolve but works
            .attrTween("d", (d: d3.PieArcDatum<DataWithPercentage>) => {
                let end = d.endAngle;
                return (t: number) => {
                    let currentAngle: number = angleInterpolation(t);
                    if (currentAngle < d.startAngle)
                        return "";

                    d.endAngle = Math.min(currentAngle, end);
                    return arc(d);
                }
            });

        d3.selectAll("slices")
            .transition()
            .duration(this.loadAnimation)
            .tween("arcRadii", () => {
                return (t: number) => 
                    arc.innerRadius(innerRadiusInterpolation(t))
                    .outerRadius(outerRadiusInterpolation(t));
            });
    }

    private generateTooltipText(d: PieArcDatum<DataWithPercentage>) {
        return "<b>" + this.capitalize(d.data.title) + ":</b> " + d.data.result + " (" + d.data.percentage + "%)";
    }

    private capitalize(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}

interface DataWithPercentage {
    title: string,
    result: number,
    colour: string,
    percentage: string
}