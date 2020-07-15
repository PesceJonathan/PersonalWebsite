import * as d3 from 'd3';
import {feature} from 'topojson-client';

export class World {

    private svg: any;

    constructor() {
        this.svg = d3.select("#WorldMap")
                    .append("svg")
                    .attr("width", "960")
                    .attr("height", "500");

        //Change to store in session storate
        let worldMapData = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(((data: any) => {
            this.render(feature(data, data.objects.countries));
        }));
    }

    render(data: any) {
        let projection = d3.geoNaturalEarth1();
        let pathGenerator = d3.geoPath().projection(projection);

        this.svg.append('path')
            .attr('d', pathGenerator({type: "Sphere"}))
            .attr("fill", "blue");

        this.svg.selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr('d', pathGenerator);
    }
}