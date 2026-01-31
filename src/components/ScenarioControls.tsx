import React from 'react';
import type { LoanTermComparisonInput } from '../logic/loanTermComparisonCalculations';

interface ScenarioControlsProps {
    values: LoanTermComparisonInput;
    onChange: (field: keyof LoanTermComparisonInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const loanOptions = [
        { label: '$10K', value: 10000 },
        { label: '$25K', value: 25000 },
        { label: '$35K', value: 35000 },
        { label: '$50K', value: 50000 },
    ];

    const aprOptions = [
        { label: '5%', value: 5 },
        { label: '7.5%', value: 7.5 },
        { label: '10%', value: 10 },
        { label: '15%', value: 15 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Loan Amount Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Loan Amount</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {loanOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('loanAmount', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.loanAmount === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.loanAmount === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.loanAmount === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* APR Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Interest Rate</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {aprOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('apr', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.apr === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.apr === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.apr === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
