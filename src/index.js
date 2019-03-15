import * as d3 from 'd3';
import visualization from './visualization';
import urlMaker from './urlGenerator';
import objectMaker from './objectGenerator';
import { dataParser } from './dataGenerator';
import { formReset } from './util/eventUtil';

document.addEventListener("DOMContentLoaded", ()=>{   
    let salaryIncome = document.getElementById("salary").value;
    let investmentReturnIncome = document.getElementById("investment-return").value;
    let incomeSavings = document.getElementById("savings").value;
    let incomeInvestments = document.getElementById("investments").value;
    let incomeExpenses = document.getElementById("expenses").value;
    let incomeTaxes = document.getElementById("taxes").value;

    let userInput =[
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

    document.getElementById("user-input").addEventListener("keydown", () => {
        d3.select("svg").remove();
        let salaryIncome = document.getElementById("salary").value;
        let investmentReturnIncome = document.getElementById("investment-return").value;
        let incomeSavings = document.getElementById("savings").value;
        let incomeInvestments = document.getElementById("investments").value;
        let incomeExpenses = document.getElementById("expenses").value;
        let incomeTaxes = document.getElementById("taxes").value;
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
    })

    formReset()
})

