const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('.num');
const allOperators = document.querySelectorAll('.operator');
let allOperatorsArray = [];
let operateArray = [];
let resultCheck = false;
function roundToMaxDigits(num){
    let decimalSplit = num.toString().split('.');
    let maxDecimalSpots = decimalSplit[0].length - 13;
    if(maxDecimalSpots > 0 && decimalSplit[1]>maxDecimalSpots){
        return num.toFixed(maxDecimalSpots).toString();
    }
    else{
        return num.toString();
    }
}

function add(numA, numB) {
    return roundToMaxDigits(numA + numB);
}

function subtract(numA, numB) {
    return roundToMaxDigits(numA - numB);
}

function multiply(numA, numB) {
    return roundToMaxDigits(numA * numB);
}

function divide(numA, numB){
    return roundToMaxDigits(numA/numB);
}

function percentage(numA){
    return roundToMaxDigits(numA/100);
}

function updateDisplay(currentButton){
    if(display.textContent.length <= 13){
        if(currentButton.id == 'decimal'){
            if(!(display.textContent)){
                display.textContent += 0 + currentButton.textContent;              
            }
            if(display.textContent.indexOf('.')==-1){
                display.textContent += currentButton.textContent;
            }
        }
        else if(currentButton.id == 'pos-neg'){
            if(display.textContent[0] == '-'){
                display.textContent = display.textContent.slice(1);
            }
            else{
                display.textContent = '-' + display.textContent;
            }
        }
        else if(currentButton.id === 'clearLast'){
            display.textContent = display.textContent.slice(0,-1);
        }
        else if(currentButton.id == 'clear'){
            display.textContent = '';
            operateArray = [];
        }
        else{
            if(resultCheck){
                display.textContent = '';
                resultCheck = false;
            }
            display.textContent += currentButton.textContent;
        }
    }
    else{
        alert('Maximum Amount of characters reached.')
    }
}

function getOperation(operator){
    console.log(resultCheck);
    console.log(operator.textContent);
    operateArray.push(display.textContent);
    operateArray.push(operator.textContent);
    display.textContent = '';
    result = display.textContent;
        if(operateArray.length >= 3 || operateArray[operateArray.length-1]=='%'){
            let numA = Number(operateArray[0]);
            let numOperator = operateArray[1];
            let numB = Number(operateArray[2]);
            let result = operate(numOperator, numA, numB);
            if(operateArray[operateArray.length-1] == '%'){
                console.log('OKK')
                console.log(operateArray);
                operateArray.splice(0,2);
            }
            else{
                operateArray.splice(0,3);
            }
            operateArray.unshift(result);
            display.textContent = '';
            resultCheck = true;
            display.textContent = operateArray[0];
        }
}

function operate(mathSymbol, numA, numB){
    console.log(operateArray);
    console.log(numA);
    console.log(numB);    
    if((operateArray[operateArray.length-1])=='%'){
        if(numA){
            return percentage(numA);
        }
        else{
            return percentage(numB);
        }
    }
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
    if(mathSymbol == '='){
        return numA;
    }
}

for(let i = 0; i < numButtons.length; i++){
    numButtons[i].addEventListener('click', updateDisplay.bind(null, numButtons[i]));
}

for(let i = 0; i < allOperators.length; i++){
    allOperatorsArray.push(allOperators[i].textContent);
    allOperators[i].addEventListener('click', getOperation.bind(null, allOperators[i]));
}
