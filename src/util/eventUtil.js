import * as d3 from 'd3';
import visualization from '../visualization';
import urlMaker from '../generators/urlGenerator';
import objectMaker from '../generators/objectGenerator';
import dataParser from '../generators/dataGenerator';
import {commafy} from './displayUtil';

export const updateRangeMax = () => {
    let salaryIncome = document.getElementById("salary").value;
    let investmentReturnIncome = document.getElementById("investment-return").value;

    document.getElementById("savings").max = `${parseInt(salaryIncome) + parseInt(investmentReturnIncome)}`
}

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