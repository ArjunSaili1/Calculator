function add(numA, numB) {
    return numA + numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB){
    return numA/numB;
}

function operate(mathSymbol, numA, numB){
    if(mathSymbol == '+'){
        return add(numA,numB);
    }
    if(mathSymbol == '-'){
        return subtract(numA, numB);
    }
    if(mathSymbol == '/' || mathSymbol == '÷'){
        return divide(numA, numB);
    }
    if(mathSymbol == '*'){
        return multiply(numA, numB);
    }
}