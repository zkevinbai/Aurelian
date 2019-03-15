export default getObjectFromData;

function getObjectFromData(
    salaryIncome,
    investmentReturnIncome,

    incomeSavings,
    incomeInvestments,
    incomeExpenses,
    incomeTaxes,

    savingsSaved,
    investmentsSaved,
    expensesSpent,
    taxesSpent,
) {
    return {
        "nodes": [
            {
                "node": 0,
                "name": "Salary"
            },
            {
                "node": 1,
                "name": "Investment Return"
            },

            {
                "node": 2,
                "name": "Income"
            },

            {
                "node": 3,
                "name": "Savings"
            },
            {
                "node": 4,
                "name": "Investments"
            },
            {
                "node": 5,
                "name": "Expenses"
            },
            {
                "node": 6,
                "name": "Taxes"
            },

            {
                "node": 7,
                "name": "Saved"
            },
            {
                "node": 8,
                "name": "Spent"
            }
        ],
        "links": [
            {
                "source": "Salary",
                "target": "Income",
                "value": salaryIncome
            },
            {
                "source": "Investment Return",
                "target": "Income",
                "value": investmentReturnIncome
            },

            {
                "source": "Income",
                "target": "Savings",
                "value": incomeSavings
            },
            {
                "source": "Income",
                "target": "Investments",
                "value": incomeInvestments
            },
            {
                "source": "Income",
                "target": "Expenses",
                "value": incomeExpenses
            },
            {
                "source": "Income",
                "target": "Taxes",
                "value": incomeTaxes
            },

            {
                "source": "Savings",
                "target": "Saved",
                "value": savingsSaved
            },
            {
                "source": "Investments",
                "target": "Saved",
                "value": investmentsSaved
            },
            {
                "source": "Expenses",
                "target": "Spent",
                "value": expensesSpent
            },
            {
                "source": "Taxes",
                "target": "Spent",
                "value": taxesSpent
            }
        ]
    }
}