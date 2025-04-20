document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fdCalculatorForm');
    const resultCard = document.getElementById('resultCard');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const principal = parseFloat(document.getElementById('principal').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value);
        const tenure = parseInt(document.getElementById('tenure').value);
        const compounding = parseInt(document.getElementById('compounding').value);

        // Calculate FD
        const result = calculateFD(principal, interestRate, tenure, compounding);

        // Display results
        displayResults(principal, interestRate, tenure, result);
    });

    form.addEventListener('reset', function() {
        resultCard.style.display = 'none';
    });
});

function calculateFD(principal, interestRate, tenure, compounding) {
    // Convert tenure from months to years
    const years = tenure / 12;
    
    // Convert interest rate from percentage to decimal
    const rate = interestRate / 100;
    
    // Calculate maturity amount using compound interest formula
    // A = P * (1 + r/n)^(n*t)
    const maturityAmount = principal * Math.pow(1 + (rate / compounding), compounding * years);
    
    // Calculate total interest earned
    const totalInterest = maturityAmount - principal;
    
    return {
        maturityAmount: maturityAmount,
        totalInterest: totalInterest
    };
}

function displayResults(principal, interestRate, tenure, result) {
    // Format numbers with commas and 2 decimal places
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Update result elements
    document.getElementById('resultPrincipal').textContent = formatter.format(principal);
    document.getElementById('resultRate').textContent = interestRate.toFixed(2) + '%';
    document.getElementById('resultTenure').textContent = tenure + ' months';
    document.getElementById('resultMaturity').textContent = formatter.format(result.maturityAmount);
    document.getElementById('resultInterest').textContent = formatter.format(result.totalInterest);

    // Show result card
    document.getElementById('resultCard').style.display = 'block';
} 