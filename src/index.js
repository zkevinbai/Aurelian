import visualization from './visualization';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{
    let salaryIncome = 0
    let investmentReturnIncome = 0
    let incomeExpenses = 0
    let incomeTaxes = 0
    let incomeSavings = 0
    let incomeInvestments = 0
    let expensesSpent = 0
    let taxesSpent = 0
    let savingsSaved = 0
    let investmentsSaved = 0

    const object = objectMaker();
    const url = urlMaker(object);
    visualization(url)
})