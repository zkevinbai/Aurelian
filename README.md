Aurelian <img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/favicon.png" alt="Aurelian Logo" align="center" height="50px" />
======


[Aurelian](https://zkevinbai.github.io/Aurelian/) is a frontend only tool designed to help you visualize and forecast your finances.

I built this over the course of 4 days from March 13 to March 17 2019 to improve my Javascript skills.

Technologies
---
Aurelian is built with only Vanilla Javascript, HTML5, CSS3, and the D3 library.

No web frameworks were used, instead, DOM manipulation was used to fetch user input data. 

Design
---
Aurelian was designed with a simple theme: Elegance over Complexity.  
I want the user experience to be seemless and intuitive.

Features
---
* Dynamic update of finacial fields next to sliders
* Live rerender of D3 Sankey visualization on new user input
* Fully repositionable nodes to allow for easy drag and drop comparision

Feature GIFs
---
## Dynamic Update
<img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/gifs/dynamicUpdate.gif" align="center"/>

## Live Rerender
<img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/gifs/liveRender.gif" align="center"/>

## Fully Repositionable Nodes
<img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/gifs/dragAndDrop.gif" align="center"/>

Code Snippets
---

## Input data to JSON to generate visualization
```js 
// src/util/eventUtil.js
import * as d3 from 'd3';
import visualization from '../visualization';
import urlMaker from '../generators/urlGenerator';
import objectMaker from '../generators/objectGenerator';
import dataParser from '../generators/dataGenerator';
import {commafy} from './displayUtil';

export const renderVisualization = () => {
    d3.select("svg").remove();

    let salaryIncome = document.getElementById("salary").value;
    let investmentReturnIncome = document.getElementById("investment-return").value;

    let incomeSavings = document.getElementById("savings").value;
    let incomeInvestments = document.getElementById("investments").value;
    let incomeExpenses = document.getElementById("expenses").value;
    let incomeTaxes = document.getElementById("taxes").value;

    document.getElementById("salary-value").innerHTML = `$${commafy(salaryIncome)}`;
    document.getElementById("investment-return-value").innerHTML = `$${commafy(investmentReturnIncome)}`;

    document.getElementById("savings-value").innerHTML = `$${commafy(incomeSavings)}`;
    document.getElementById("investments-value").innerHTML = `$${commafy(incomeInvestments)}`;
    document.getElementById("expenses-value").innerHTML = `$${commafy(incomeExpenses)}`;
    document.getElementById("taxes-value").innerHTML = `$${commafy(incomeTaxes)}`;

    let userInput = [
        salaryIncome,
        investmentReturnIncome,
        incomeSavings,
        incomeInvestments,
        incomeExpenses,
        incomeTaxes,
    ];
    
    let inputData = dataParser(...userInput);
    let inputObject = objectMaker(...inputData);
    let url = urlMaker(inputObject);
    visualization(url)
}

export const formInputChange = () => {
    document.getElementById("user-input").addEventListener("keyup", renderVisualization)
    document.getElementById("user-input").addEventListener("mouseup", renderVisualization)
}

export const formReset = () =>{
    document.getElementById("user-input").addEventListener("reset", () => setTimeout(
        renderVisualization
    ))
}
```

## JSON to URL

```js
// src/generators/urlGenerator.js

function getUrlFromObject(object) {
    var jsonse = JSON.stringify(object);
    var blob = new Blob([jsonse], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    return url;
}

export default getUrlFromObject;
```

## URL to Sankey Visualization

```js
// src/visualization.js

const d3 = window.d3;

export default (url) => {
var units = "dollars";

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// format variables
var color = d3.scaleOrdinal().range([
    "rgba(45, 165, 239, 0.75)", 
    "rgba(78, 244, 242, 0.75)",

    "rgb(37, 90, 234)",

    "rgb(39,201,168)",
    "rgb(56,241,170)",
    "rgb(239, 237, 91)",
    "rgb(247, 168, 236)",

    "rgb(33, 237, 97)",
    "rgb(239, 43, 49)"
]);
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function (d) { return formatNumber(d) + " " + units; },
    color;

// append the svg object to the body of the page
var svg = d3.select(".visualization").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 700 350")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .classed("inner-svg", true)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);
var path = sankey.link();

const strokeColor = [
        "rgb(37, 90, 234)",
        "rgb(37, 90, 234)",

        "rgb(39,201,168)",
        "rgb(56,241,170)",
        "rgb(239, 237, 91)",
        "rgb(247, 168, 236)",

        "rgb(33, 237, 97)",
        "rgb(33, 237, 97)",
        "rgb(239, 43, 49)",
        "rgb(239, 43, 49)",
    ];

// load the data
// d3.json('./src/data/data.json', function (error, graph) {
d3.json(url, function (error, graph) {
    var nodeMap = {};
    graph.nodes.forEach(function (x) { nodeMap[x.name] = x; });
    graph.links = graph.links.map(function (x) {
        return {
            source: nodeMap[x.source],
            target: nodeMap[x.target],
            value: x.value
        };
    });
    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);
        
    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function (d) { return Math.max(1, d.dy); })
        .style("stroke", function (d, i) {
            return d.color = strokeColor[i];
        })
        .sort(function (a, b) { return b.dy - a.dy; });

    // add the link titles
    link.append("title")
        .text(function (d) {
            return d.source.name + " → " +
                d.target.name + "\n" + format(d.value);
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .call(d3.drag()
            .subject(function (d) {
                return d;
            })
            .on("start", function () {
                this.parentNode.appendChild(this);
            })
            .on("drag", dragmove));

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            return d.color = color(d.name.replace(/ .*/, ""));
        })
        .style("stroke", function (d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
            return d.name + "\n" + format(d.value);
        });

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function (d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) { 
            if(d.value !== 0){
                return d.name; 
            }
        })
        .filter(function (d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // the function for moving the nodes
    function dragmove(d) {
        d3.select(this)
            .attr("transform",
                "translate(" + (
                    d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                )
                + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
        sankey.relayout();
        link.attr("d", path);
    }
});
}

d3.sankey = function () {
    var sankey = {},
        nodeWidth = 24,
        nodePadding = 8,
        size = [1, 1],
        nodes = [],
        links = [];

    sankey.nodeWidth = function (_) {
        if (!arguments.length) return nodeWidth;
        nodeWidth = +_;
        return sankey;
    };

    sankey.nodePadding = function (_) {
        if (!arguments.length) return nodePadding;
        nodePadding = +_;
        return sankey;
    };

    sankey.nodes = function (_) {
        if (!arguments.length) return nodes;
        nodes = _;
        return sankey;
    };

    sankey.links = function (_) {
        if (!arguments.length) return links;
        links = _;
        return sankey;
    };

    sankey.size = function (_) {
        if (!arguments.length) return size;
        size = _;
        return sankey;
    };

    sankey.layout = function (iterations) {
        computeNodeLinks();
        computeNodeValues();
        computeNodeBreadths();
        computeNodeDepths(iterations);
        computeLinkDepths();
        return sankey;
    };

    sankey.relayout = function () {
        computeLinkDepths();
        return sankey;
    };

    sankey.link = function () {
        var curvature = .5;

        function link(d) {
            var x0 = d.source.x + d.source.dx,
                x1 = d.target.x,
                xi = d3.interpolateNumber(x0, x1),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = d.source.y + d.sy + d.dy / 2,
                y1 = d.target.y + d.ty + d.dy / 2;
            return "M" + x0 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1;
        }

        link.curvature = function (_) {
            if (!arguments.length) return curvature;
            curvature = +_;
            return link;
        };

        return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
        nodes.forEach(function (node) {
            node.sourceLinks = [];
            node.targetLinks = [];
        });
        links.forEach(function (link) {
            var source = link.source,
                target = link.target;
            if (typeof source === "number") source = link.source = nodes[link.source];
            if (typeof target === "number") target = link.target = nodes[link.target];
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
        });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
        nodes.forEach(function (node) {
            node.value = Math.max(
                d3.sum(node.sourceLinks, value),
                d3.sum(node.targetLinks, value)
            );
        });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
        var remainingNodes = nodes,
            nextNodes,
            x = 0;

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function (node) {
                node.x = x;
                node.dx = nodeWidth;
                node.sourceLinks.forEach(function (link) {
                    if (nextNodes.indexOf(link.target) < 0) {
                        nextNodes.push(link.target);
                    }
                });
            });
            remainingNodes = nextNodes;
            ++x;
        }

        //
        moveSinksRight(x);
        scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
        nodes.forEach(function (node) {
            if (!node.targetLinks.length) {
                node.x = d3.min(node.sourceLinks, function (d) { return d.target.x; }) - 1;
            }
        });
    }

    function moveSinksRight(x) {
        nodes.forEach(function (node) {
            if (!node.sourceLinks.length) {
                node.x = x - 1;
            }
        });
    }

    function scaleNodeBreadths(kx) {
        nodes.forEach(function (node) {
            node.x *= kx;
        });
    }

    function computeNodeDepths(iterations) {
        var nodesByBreadth = d3.nest()
            .key(function (d) { return d.x; })
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function (d) { return d.values; });

        //
        initializeNodeDepth();
        resolveCollisions();
        for (var alpha = 1; iterations > 0; --iterations) {
            relaxRightToLeft(alpha *= .99);
            resolveCollisions();
            relaxLeftToRight(alpha);
            resolveCollisions();
        }

        function initializeNodeDepth() {
            var ky = d3.min(nodesByBreadth, function (nodes) {
                return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
            });

            nodesByBreadth.forEach(function (nodes) {
                nodes.forEach(function (node, i) {
                    node.y = i;
                    node.dy = node.value * ky;
                });
            });

            links.forEach(function (link) {
                link.dy = link.value * ky;
            });
        }

        function relaxLeftToRight(alpha) {
            nodesByBreadth.forEach(function (nodes, breadth) {
                nodes.forEach(function (node) {
                    if (node.targetLinks.length) {
                        var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedSource(link) {
                return center(link.source) * link.value;
            }
        }

        function relaxRightToLeft(alpha) {
            nodesByBreadth.slice().reverse().forEach(function (nodes) {
                nodes.forEach(function (node) {
                    if (node.sourceLinks.length) {
                        var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedTarget(link) {
                return center(link.target) * link.value;
            }
        }

        function resolveCollisions() {
            nodesByBreadth.forEach(function (nodes) {
                var node,
                    dy,
                    y0 = 0,
                    n = nodes.length,
                    i;

                // Push any overlapping nodes down.
                nodes.sort(ascendingDepth);
                for (i = 0; i < n; ++i) {
                    node = nodes[i];
                    dy = y0 - node.y;
                    if (dy > 0) node.y += dy;
                    y0 = node.y + node.dy + nodePadding;
                }

                // If the bottommost node goes outside the bounds, push it back up.
                dy = y0 - nodePadding - size[1];
                if (dy > 0) {
                    y0 = node.y -= dy;

                    // Push any overlapping nodes back up.
                    for (i = n - 2; i >= 0; --i) {
                        node = nodes[i];
                        dy = node.y + node.dy + nodePadding - y0;
                        if (dy > 0) node.y -= dy;
                        y0 = node.y;
                    }
                }
            });
        }

        function ascendingDepth(a, b) {
            return a.y - b.y;
        }
    }

    function computeLinkDepths() {
        nodes.forEach(function (node) {
            node.sourceLinks.sort(ascendingTargetDepth);
            node.targetLinks.sort(ascendingSourceDepth);
        });
        nodes.forEach(function (node) {
            var sy = 0, ty = 0;
            node.sourceLinks.forEach(function (link) {
                link.sy = sy;
                sy += link.dy;
            });
            node.targetLinks.forEach(function (link) {
                link.ty = ty;
                ty += link.dy;
            });
        });

        function ascendingSourceDepth(a, b) {
            return a.source.y - b.source.y;
        }

        function ascendingTargetDepth(a, b) {
            return a.target.y - b.target.y;
        }
    }

    function center(node) {
        return node.y + node.dy / 2;
    }

    function value(link) {
        return link.value;
    }

    return sankey;
};

```