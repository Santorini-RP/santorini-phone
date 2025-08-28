import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Helper to format numbers for display
const formatNumber = (numStr: string) => {
    if (!numStr || numStr === 'Error') return numStr;
    const [integerPart, decimalPart] = numStr.split('.');
    const formattedInteger = Number(integerPart).toLocaleString('pt-BR');
    return decimalPart !== undefined ? `${formattedInteger},${decimalPart}` : formattedInteger;
};

// A simple evaluation function.
const evaluateExpression = (parts: string[]): number => {
    try {
        // Replace display operators with JS operators
        const expressionString = parts.join(' ').replace(/,/g, '.').replace(/×/g, '*').replace(/÷/g, '/');
        // Using the Function constructor is safer than eval()
        return new Function('return ' + expressionString)();
    } catch (e) {
        console.error("Evaluation error:", e);
        return NaN; // Indicate an error
    }
};

export const useCalculatorStore = defineStore('calculator-new', () => {
    // --- STATE ---
    const expression = ref<string[]>([]); // e.g., ['123', '+', '45']
    const currentInput = ref('0');
    const history = ref('');
    const isResultDisplayed = ref(false);

    // --- COMPUTED ---
    const isDirty = computed(() => currentInput.value !== '0' || expression.value.length > 0);
    const displayExpression = computed(() => history.value);

    const mainDisplay = computed(() => {
        if (isResultDisplayed.value) {
            return formatNumber(currentInput.value);
        }

        const partsToDisplay = [...expression.value];
        if (currentInput.value !== '0' || expression.value.length === 0) {
            partsToDisplay.push(currentInput.value);
        }

        return partsToDisplay.map(part => {
            if (['+', '-', '*', '/'].includes(part)) {
                return part.replace('*', '×').replace('/', '÷');
            }
            // Format numbers, but leave operators as is
            return formatNumber(part);
        }).join(' ');
    });

    // --- ACTIONS ---
    const clear = () => {
        expression.value = [];
        currentInput.value = '0';
        history.value = '';
        isResultDisplayed.value = false;
    };

    const inputDigit = (digit: string) => {
        if (isResultDisplayed.value) {
            clear();
        }
        isResultDisplayed.value = false;
        
        if (currentInput.value.replace(/[.-]/g, '').length >= 9) return;
        currentInput.value = currentInput.value === '0' ? digit : currentInput.value + digit;
    };

    const inputDecimal = () => {
        if (isResultDisplayed.value) {
            clear();
        }
        isResultDisplayed.value = false;
        if (!currentInput.value.includes('.')) {
            currentInput.value += '.';
        }
    };

    const backspace = () => {
        if (isResultDisplayed.value) {
            clear();
            return;
        }
        
        if (currentInput.value !== '0') {
            currentInput.value = currentInput.value.slice(0, -1);
            if (currentInput.value === '' || currentInput.value === '-') {
                currentInput.value = '0';
            }
        } else if (expression.value.length > 0) {
            expression.value.pop(); // remove operator
            const numberToEdit = expression.value.pop() || '0';
            currentInput.value = numberToEdit;
        }
    };

    const inputOperator = (op: string) => {
        if (isResultDisplayed.value) {
            expression.value = [currentInput.value.replace(',', '.')];
            isResultDisplayed.value = false;
        } else {
            const lastPart = expression.value[expression.value.length - 1];
            if (['+', '-', '*', '/'].includes(lastPart) && currentInput.value === '0') {
                expression.value[expression.value.length - 1] = op;
                return;
            }
            expression.value.push(currentInput.value.replace(',', '.'));
        }
        
        expression.value.push(op);
        currentInput.value = '0';
    };

    const calculate = () => {
        if (expression.value.length === 0) return;

        const lastPart = expression.value[expression.value.length - 1];
        if (['+', '-', '*', '/'].includes(lastPart) && currentInput.value === '0') {
            return; // Avoid calculating on trailing operator like "5 +"
        }

        const finalExpression = [...expression.value, currentInput.value.replace(',', '.')];
        const result = evaluateExpression(finalExpression);

        if (isNaN(result) || !isFinite(result)) {
            history.value = '';
            currentInput.value = 'Error';
        } else {
            history.value = finalExpression.map(p => p.replace('*', '×').replace('/', '÷')).join(' ');
            currentInput.value = String(result).replace('.', ',');
        }

        expression.value = [];
        isResultDisplayed.value = true;
    };

    const toggleSign = () => {
        if (currentInput.value !== '0' && currentInput.value !== 'Error') {
            currentInput.value = String(parseFloat(currentInput.value.replace(',', '.')) * -1).replace('.', ',');
        }
    };

    const percentage = () => {
        if (currentInput.value === 'Error') return;
        const value = parseFloat(currentInput.value.replace(',', '.')) / 100;
        currentInput.value = String(value).replace('.', ',');
        isResultDisplayed.value = true;
        expression.value = [];
    };

    return {
        currentInput,
        isDirty,
        displayExpression,
        mainDisplay,
        inputDigit,
        inputDecimal,
        backspace,
        clear,
        inputOperator,
        calculate,
        toggleSign,
        percentage,
    };
})
