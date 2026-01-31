import React from 'react';
import type { LoanTermComparisonResult } from '../logic/loanTermComparisonCalculations';

interface ResultsPanelProps {
    result: LoanTermComparisonResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const hasSavings = result.interestDiff36vs60 > 0;

    return (
        <div className="card" style={{
            background: hasSavings
                ? 'linear-gradient(to bottom, #ECFDF5, #D1FAE5)'
                : 'linear-gradient(to bottom, #F0F9FF, #E8F4FD)',
            borderColor: hasSavings ? '#6EE7B7' : '#93C5FD',
            boxShadow: hasSavings
                ? '0 2px 8px -2px rgba(16, 185, 129, 0.15)'
                : '0 2px 8px -2px rgba(14, 165, 233, 0.15)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Interest Savings (36 vs 60 mo)
                </h2>
                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: hasSavings ? '#047857' : '#0C4A6E', lineHeight: 1, letterSpacing: '-0.025em' }}>
                    {formatCurrency(result.interestDiff36vs60)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{ margin: 'var(--space-6) 0', border: 'none', borderTop: `1px solid ${hasSavings ? '#6EE7B7' : '#93C5FD'}` }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>36 MO PAYMENT</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.term36.monthlyPayment)}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${hasSavings ? '#6EE7B7' : '#93C5FD'}`, borderRight: `1px solid ${hasSavings ? '#6EE7B7' : '#93C5FD'}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>48 MO PAYMENT</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.term48.monthlyPayment)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>60 MO PAYMENT</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.term60.monthlyPayment)}
                    </div>
                </div>
            </div>

            {hasSavings && (
                <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#D1FAE5', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#065F46' }}>
                        Shorter terms typically result in lower total interest paid
                    </span>
                </div>
            )}
        </div>
    );
};
