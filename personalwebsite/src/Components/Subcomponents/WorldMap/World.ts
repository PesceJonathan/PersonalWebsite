import * as d3 from 'd3';
import {feature} from 'topojson-client';

export class World {

    private svg: any;
    private tooltip: any;
    private tooltipImage: any;
    private tooltipCityName: any;
    private tooltipDescription: any;

    constructor() {
        this.svg = d3.select("#WorldMap")
                    .append("svg")
                    .attr("viewBox", "0 0 960 500")
                    .attr("width", "100vw")
                    .attr("height", "100vh")
                    .append("g");

        //Change to store in session storate
        let worldMapData = d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-50m.json")
        .then(((data: any) => {
            this.render(feature(data, data.objects.countries));
        }));

        this.tooltip = d3.select("#WorldMapTooltip");
        this.tooltipImage = d3.select("#WorldMapToolTipImage");
        this.tooltipCityName = d3.select("#WorldMapToolTipName");
        this.tooltipDescription = d3.select("#WorldMapToolTipDescription");
    }

    render(data: any) {
        let projection: d3.GeoProjection = d3.geoNaturalEarth1();
        let pathGenerator = d3.geoPath().projection(projection);

        this.svg.append('path')
            .attr('d', pathGenerator({type: "Sphere"}))
            .attr("fill", "blue");

        this.svg.selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr('d', pathGenerator)
            .on("mousemove", (d: any, i: any, n: any) => {
                console.log(d3.mouse(n[i]));
            });

        var circles = this.svg.selectAll("circle").data(tempCity);

        circles.enter().append("image")
                        .attr("class", "pin")
                        .attr("xlink:href", "https://image.flaticon.com/icons/svg/684/684908.svg")
                        .attr("height", 10)
                        .attr("width", 10)
                        .attr("transform", "translate(-5, -10)")
                        .attr("x", (d: any) => (projection([d.long, d.lat]) as number[])[0])
                        .attr("y", (d: any) => (projection([d.long, d.lat]) as number[])[1])
                        .on("mouseover", (d: any) => {
                            this.tooltip.style("opacity", 1);
                            this.tooltipImage.attr("src", d.img);
                            this.tooltipCityName.html(d.name);
                            this.tooltipDescription.html(d.description);
                        })
                        .on("mouseleave",(d: any) => this.tooltip.style("opacity", 0))
                        .on("mousemove", (d: any, i: any, n: any) => {
            
                            let tooltipWidth: number = this.tooltip.node()?.offsetWidth ?? 0;
                            let tooltipHeight: number = this.tooltip.node()?.offsetHeight ?? 0;
            
                            let positionLeft: number = ((d3.mouse(n[i])[0]) / 960) * 100;
                            let positionRight: number = ((d3.mouse(n[i])[1]) / 500) * 100;

                            // console.log(d3.mouse(n[i])[1]);
            
                            this.tooltip.style("left", positionLeft + "vw")
                                        .style("top", positionRight + "vh");
                        });
    }
}



const tempCity = [
    {
        "name": "Montreal",
        "description": "Home Town Bithc",
        "lat": "45.50884",
        "long": "-73.58781",
        "img": "https://raw.githubusercontent.com/PesceJonathan/PersonalWebsite/ChessPage/Countries/Canada/Montreal.jpg"
    }
]
