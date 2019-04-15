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

<img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/code/urlFromJSON.png" align="center"/>

## URL to Sankey Visualization

<img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/code/sankeyP1.png" align="center"/>

<img src="https://github.com/zkevinbai/Aurelian/blob/master/assets/code/sankeyP2.png" align="center"/>