let numA = null;
let numB = null;
let operater = null;
let result = false;
function roundToMaxDigits(num){
    let decimalSplit = num.toString().split('.');
    let maxDecimalSpots = decimalSplit[0].length - 13;
    if(maxDecimalSpots > 0 && decimalSplit[1]>maxDecimalSpots){
        console.log('hello')
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
    return roundToMaxDigits(numA/numB)
}

function operate(mathSymbol, numA, numB){
    if(mathSymbol && numA && numB){
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
}

display = document.querySelector('.display');
allNumButtons = document.querySelector('.numbers');
for(let i=0;i<allNumButtons.children.length;i++){
    let currentButton = allNumButtons.children[i];
    currentButton.addEventListener('click', ()=>{
        if(display.textContent.length < 13){
            if(currentButton.classList.contains('shown')){
                if(currentButton.id == 'decimal'){
                    if(!(display.textContent)){
                        display.textContent += 0;
                        display.textContent += currentButton.textContent;                    
                    }
                    if(display.textContent.indexOf('.')==-1){
                        display.textContent += currentButton.textContent;
                    }
                }
                else{
                    if(result){
                        numA = Number(display.textContent);
                        display.textContent = '';
                        display.textContent += currentButton.textContent;
                    }
                    else{
                        display.textContent += currentButton.textContent;
                    }
                }
            }
            if(currentButton.id == 'pos-neg'){
                if(display.textContent[0] == '-'){
                    display.textContent = display.textContent.slice(1);
                }
                else{
                    display.textContent = '-' + display.textContent;
                }
            }
        }
        if(currentButton.id == 'clearLast'){
            display.textContent = display.textContent.slice(0,-1);
        }
        if(currentButton.id == 'clear'){
            display.textContent = '';
            numA = null;
            numB = null;
        }

        if(currentButton.classList.contains('operator')){
            if(numA){
                numB = Number(display.textContent);
                document.getElementById('equals').click();
            }
            else{
                numA = Number(display.textContent);
                display.textContent = '';
                operater = currentButton.textContent;
            }
        }
        if(currentButton.id == 'equals'){
            numB = Number(display.textContent);
            if(operate(operater,numA,numB)){
                display.textContent = operate(operater,numA,numB);
                numA=null;
                numB=null;
                result = true;
            }
        }
        if(currentButton.id == 'percent'){
            display.textContent = (Number(display.textContent)/100).toString()
        }
    });
}

