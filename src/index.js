import visualization from './visualization';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{
    let salaryIncome = 75000;
    let investmentReturnIncome = 5000;

    let incomeSavings = 12000;
    let incomeInvestments = 4000;
    let incomeExpenses = 36000;
    let incomeTaxes = 28000;

    let savingsSaved = 12000;
    let investmentsSaved = 4000;
    let expensesSpent = 36000;
    let taxesSpent = 28000;

    const object = objectMaker(
        salaryIncome,
        investmentReturnIncome,
        incomeExpenses,
        incomeTaxes,
        incomeSavings,
        incomeInvestments,
        expensesSpent,
        taxesSpent,
        savingsSaved,
        investmentsSaved
    );
    const url = urlMaker(object);
    visualization(url)
})