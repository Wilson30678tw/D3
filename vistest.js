import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawVis() {
  

/*const dataset = [
  { platform: "PS2", global_sales: 400, jp_sales: 139 },
  { platform: "DS", global_sales: 2152, jp_sales: 1500 },
  { platform: "PS3", global_sales: 1331, jp_sales: 800 },
  { platform: "Wii", global_sales: 1320, jp_sales: 1500 },
  { platform: "X360", global_sales: 1262, jp_sales: 100 },
  { platform: "PSP", global_sales: 1209, jp_sales: 76 },
  { platform: "PC", global_sales: 4500, jp_sales: 250 },
  { platform: "XB", global_sales: 150, jp_sales: 180 },
  { platform: "GBA", global_sales: 120, jp_sales: 250 },
];*/
const dataset = await d3.csv("./datasets/videogames_wide.csv", d3.autoType);

//Global_Sales   JP_Sales
const width = 640;
const height = 400;

const margin = { top: 40, right: 40, bottom: 20, left: 40 };

const svg = d3
  .select("#visContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("border","1px solid black");

const maxGlobalSales = d3.max(dataset, (d) => d.Global_Sales);
const maxJpSales = d3.max(dataset, (d) => d.JP_Sales);

const xScale = d3
.scaleLinear()
.domain([0, maxGlobalSales ])
.range([margin.left,width - margin.right]);
/*const yScale = d3.scaleLinear().domain([120, 4500]).range([0, 400]);*/

const colorScale = d3
.scaleLinear()
.domain(0,maxGlobalSales)
.range(["blue","red"])

const yScale = d3
.scaleLinear()
.domain([0, maxJpSales ])
.range([height-margin.bottom, margin.top]);
/*const yScale = d3.scaleLinear().domain([120, 4500]).range([0, 400]);*/

/*const g = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);*/




//console.log(xScale(2190));

svg
  .selectAll("circle")
  .data(dataset)
  .join("circle")
  .attr("cx", (d) => {
    return xScale(d.Global_Sales);
  })
  .attr ("cy",(d) => {
    return yScale(d.JP_Sales);
  })
  .attr("r", 10)
  //.attr("width", 10)
  //.attr("height", 10)
  .attr("fill", (d) => {

    if(d.Name ==="Super Mario Bros."){return"gold";

    }
   /* if(d.Name.toLowerCase ==="Super Mario Bros."){return"gold";

    }*/
    
    else if(d.platform ==="Wii"){return"green";

    }
    
    return "grey";
  });
  
  /*.attr("fill", () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  });*/
  svg
  .append("g")
  .call(d3.axisBottom(xScale))
  .attr("transform",`translate(0, ${height - margin.bottom})`);


  svg
  .append("g")
  .call(d3.axisLeft(yScale))
  .attr("transform",`translate(${margin.left},0)`);
}
drawVis();