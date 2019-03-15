import visualization from './visualization';
import {
    defaultData, 
    dataMaker, 
    dataParser
} from './dataGenerator';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{   
    
    let salaryIncome = document.getElementById("salary").value;
    let investmentReturnIncome = document.getElementById("investment-return").value;
    let incomeSavings = document.getElementById("savings").value;
    let incomeInvestments = document.getElementById("investments").value;
    let incomeExpenses = document.getElementById("expenses").value;
    let incomeTaxes = document.getElementById("taxes").value;

    const userInput =[
        salaryIncome,
        investmentReturnIncome,
        incomeSavings,
        incomeInvestments,
        incomeExpenses,
        incomeTaxes,
    ];
    const inputData = dataParser(...userInput);
    const inputObject = objectMaker(...inputData);
    const url = urlMaker(inputObject);
    visualization(url)
})

// document.addEventListener("change"), () => {
//     let salaryIncome = document.getElementById("salary").value;
//     let investmentReturnIncome = document.getElementById("investment-return").value;
//     let incomeSavings = document.getElementById("savings").value;
//     let incomeInvestments = document.getElementById("investments").value;
//     let incomeExpenses = document.getElementById("expenses").value;
//     let incomeTaxes = document.getElementById("taxes").value;

//     const userInput = [
//         salaryIncome,
//         investmentReturnIncome,
//         incomeSavings,
//         incomeInvestments,
//         incomeExpenses,
//         incomeTaxes,
//     ];
//     const inputData = dataParser(...userInput);
//     const inputObject = objectMaker(...inputData);
//     const url = urlMaker(inputObject);
//     visualization(url)
// }