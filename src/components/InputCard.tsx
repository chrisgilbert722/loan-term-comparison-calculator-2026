import React from 'react';
import type { LoanTermComparisonInput } from '../logic/loanTermComparisonCalculations';

interface InputCardProps {
    values: LoanTermComparisonInput;
    onChange: (field: keyof LoanTermComparisonInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Loan Amount */}
                <div>
                    <label htmlFor="loanAmount">Loan Amount ($)</label>
                    <input
                        type="number"
                        id="loanAmount"
                        value={values.loanAmount}
                        onChange={(e) => onChange('loanAmount', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="1000"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        The total amount you plan to borrow
                    </span>
                </div>

                {/* APR */}
                <div>
                    <label htmlFor="apr">Interest Rate (APR) %</label>
                    <input
                        type="number"
                        id="apr"
                        value={values.apr}
                        onChange={(e) => onChange('apr', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Annual percentage rate for the loan
                    </span>
                </div>
            </div>
        </div>
    );
};
