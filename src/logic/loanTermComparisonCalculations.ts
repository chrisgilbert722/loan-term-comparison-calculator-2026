export interface LoanTermComparisonInput {
    loanAmount: number;
    apr: number;
}

export interface TermResult {
    termMonths: number;
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
}

export interface LoanTermComparisonResult {
    loanAmount: number;
    apr: number;
    term36: TermResult;
    term48: TermResult;
    term60: TermResult;
    interestDiff36vs60: number;
    interestDiff48vs60: number;
    interestDiff36vs48: number;
    lowestInterestTerm: number;
    lowestPaymentTerm: number;
    message: string;
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, termMonths: number): number {
    if (monthlyRate === 0) {
        return principal / termMonths;
    }
    // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + monthlyRate, termMonths);
    return principal * (monthlyRate * factor) / (factor - 1);
}

function calculateTermDetails(loanAmount: number, apr: number, termMonths: number): TermResult {
    if (loanAmount <= 0) {
        return {
            termMonths,
            monthlyPayment: 0,
            totalInterest: 0,
            totalCost: 0
        };
    }

    const monthlyRate = apr / 100 / 12;
    const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, termMonths);
    const totalCost = monthlyPayment * termMonths;
    const totalInterest = totalCost - loanAmount;

    return {
        termMonths,
        monthlyPayment,
        totalInterest: Math.max(0, totalInterest),
        totalCost: Math.max(loanAmount, totalCost)
    };
}

export function calculateLoanTermComparison(input: LoanTermComparisonInput): LoanTermComparisonResult {
    const { loanAmount, apr } = input;

    // Calculate for each term
    const term36 = calculateTermDetails(loanAmount, apr, 36);
    const term48 = calculateTermDetails(loanAmount, apr, 48);
    const term60 = calculateTermDetails(loanAmount, apr, 60);

    // Calculate differences
    const interestDiff36vs60 = term60.totalInterest - term36.totalInterest;
    const interestDiff48vs60 = term60.totalInterest - term48.totalInterest;
    const interestDiff36vs48 = term48.totalInterest - term36.totalInterest;

    // Find lowest interest and lowest payment terms
    const lowestInterestTerm = 36; // Shorter term always has lowest interest
    const lowestPaymentTerm = 60; // Longer term always has lowest payment

    // Generate message
    let message = '';
    if (loanAmount <= 0) {
        message = 'Enter a loan amount to compare terms';
    } else if (interestDiff36vs60 > loanAmount * 0.1) {
        message = 'Shorter terms offer significant interest savings';
    } else if (interestDiff36vs60 > 0) {
        message = 'Compare monthly payment vs. total cost tradeoffs';
    } else {
        message = 'View estimated costs for each loan term';
    }

    return {
        loanAmount,
        apr,
        term36,
        term48,
        term60,
        interestDiff36vs60,
        interestDiff48vs60,
        interestDiff36vs48,
        lowestInterestTerm,
        lowestPaymentTerm,
        message
    };
}
