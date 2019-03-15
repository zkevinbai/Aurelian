export default genDataObject;

function genDataObject(
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
                "value": 75000
            },
            {
                "source": "Investment Return",
                "target": "Income",
                "value": 5000
            },

            {
                "source": "Income",
                "target": "Savings",
                "value": 12000
            },
            {
                "source": "Income",
                "target": "Investments",
                "value": 4000
            },
            {
                "source": "Income",
                "target": "Expenses",
                "value": 36000
            },
            {
                "source": "Income",
                "target": "Taxes",
                "value": 28000
            },

            {
                "source": "Savings",
                "target": "Saved",
                "value": 12000
            },
            {
                "source": "Investments",
                "target": "Saved",
                "value": 4000
            },
            {
                "source": "Expenses",
                "target": "Spent",
                "value": 36000
            },
            {
                "source": "Taxes",
                "target": "Spent",
                "value": 28000
            }
        ]
    }
}