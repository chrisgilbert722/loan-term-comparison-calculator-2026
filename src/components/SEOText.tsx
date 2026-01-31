import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This loan term comparison calculator estimates monthly payments, total interest paid,
                and total loan costs for 36, 48, and 60 month loan terms based on the amount and
                interest rate you enter. Shorter terms typically result in higher monthly payments
                but lower total interest, while longer terms offer lower payments but higher total
                costs. Actual loan terms and rates vary by lender. These figures are estimates only
                and are provided for informational purposes. Consult with a lender for specific
                loan terms and conditions.
            </p>
        </div>
    );
};
