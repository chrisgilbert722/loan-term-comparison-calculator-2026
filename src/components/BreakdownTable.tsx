import React from 'react';
import type { LoanTermComparisonResult } from '../logic/loanTermComparisonCalculations';

interface BreakdownTableProps {
    result: LoanTermComparisonResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const term36Rows = [
        { label: 'Estimated Monthly Payment', value: formatMoney(result.term36.monthlyPayment), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.term36.totalInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.term36.totalCost), isTotal: true },
    ];

    const term48Rows = [
        { label: 'Estimated Monthly Payment', value: formatMoney(result.term48.monthlyPayment), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.term48.totalInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.term48.totalCost), isTotal: true },
    ];

    const term60Rows = [
        { label: 'Estimated Monthly Payment', value: formatMoney(result.term60.monthlyPayment), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.term60.totalInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.term60.totalCost), isTotal: true },
    ];

    const comparisonRows = [
        { label: 'Interest Savings (36 vs 60 mo)', value: formatMoney(result.interestDiff36vs60), isTotal: false },
        { label: 'Interest Savings (48 vs 60 mo)', value: formatMoney(result.interestDiff48vs60), isTotal: false },
        { label: 'Interest Savings (36 vs 48 mo)', value: formatMoney(result.interestDiff36vs48), isTotal: false },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* 36 Month Term Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', background: '#ECFDF5' }}>
                <h3 style={{ fontSize: '1rem', color: '#065F46' }}>36 Month Term (3 Years)</h3>
            </div>
            {renderTable(term36Rows)}

            {/* 48 Month Term Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: '#92400E' }}>48 Month Term (4 Years)</h3>
            </div>
            {renderTable(term48Rows)}

            {/* 60 Month Term Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#FEE2E2' }}>
                <h3 style={{ fontSize: '1rem', color: '#991B1B' }}>60 Month Term (5 Years)</h3>
            </div>
            {renderTable(term60Rows)}

            {/* Comparison Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Estimated Interest Comparison</h3>
            </div>
            {renderTable(comparisonRows, true)}
        </div>
    );
};
