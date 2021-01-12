import * as d3 from 'd3';
import {feature} from 'topojson-client';
import places from "../Data/places.json";

export class World {

    private svg: any;
    private tooltip: any;
    private tooltipImage: any;
    private tooltipCityName: any;
    private tooltipDescription: any;
    private projection: d3.GeoProjection;
    private pathGenerator: any;
    private circles: any;

    constructor() {
        // this.projection = d3.geoOrthographic();
        this.projection = d3.geoNaturalEarth1();
        this.pathGenerator = d3.geoPath().projection(this.projection);

        let zoom: any = d3.zoom()
        .scaleExtent([0.9, 25])
        .on("zoom", () => {
            this.svg.attr("transform", d3.event.transform);
            let k = d3.event.transform.k;
            let dim = Math.floor(10 / Math.sqrt(k)) - 1;  
            this.svg.selectAll(".pin").attr("height", dim + "px").attr("width", dim + "px").attr("transform", "translate(0, -" + dim + ")");
        });

        this.svg = d3.select("#WorldMap")
                    .append("svg")
                    .attr("viewBox", "0 0 960 500")
                    .attr("max-width", "100%")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .append("g")
                    .call(zoom)
                    .append("g");

        d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-50m.json")
            .then(((data: any) => {
                this.render(feature(data, data.objects.countries));
            }));

        places.cities.map(t => new Image().src = t.img);

        this.tooltip = d3.select("#WorldMapTooltip");
        this.tooltipImage = d3.select("#WorldMapToolTipImage");
        this.tooltipCityName = d3.select("#WorldMapToolTipName");
        this.tooltipDescription = d3.select("#WorldMapToolTipDescription");
    }
    render(data: any) {
        this.svg.append('path')
            .attr('d', this.pathGenerator({type: "Sphere"}))
            .attr("fill", "rgb(32 33 35)");

        this.svg.selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr('d', this.pathGenerator);

        this.circles = this.svg.selectAll("pin").data(places.cities);

        this.circles.enter()
                        .append("image")
                        // .attr("xlink:href", "https://image.flaticon.com/icons/svg/684/684908.svg")
                        .attr("xlink:href", (d:any) => d.pin)
                        .classed("pin", true)
                        .attr("height", 9)
                        .attr("width", 9)
                        .attr("transform", "translate(-5, -10)")
                        .attr("x", (d: any) => (this.projection([d.long, d.lat]) as number[])[0])
                        .attr("y", (d: any) => (this.projection([d.long, d.lat]) as number[])[1])
                        .on("mouseover", (d: any) => {
                            this.tooltip.style("display", "block");
                            this.tooltipImage.attr("src", d.img);
                            this.tooltipCityName.html(d.name);
                            this.tooltipDescription.html(d.description);
                        })
                        .on("mouseleave",(d: any) => this.tooltip.style("display", "none"))
                        .on("mousemove", (d: any, i: any, n: any) => {            
                            this.tooltip.style("left", d3.event.clientX + "px")
                                        .style("top", d3.event.clientY + "px");
                        });
    }
}