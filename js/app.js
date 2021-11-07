const card = document.querySelector('.card');
const tipInput = document.querySelector('#tip-percentage');
const personInput = document.querySelector('#person-quantity');
const billInput = document.querySelector('#bill-quantity');

let tipPercentage = 0,
    billQuantity = 0 ,
    numberOfPeople = 0;

document.addEventListener('DOMContentLoaded', ()=>{

    card.addEventListener('change', evt => {
        const input = evt.target;
        eventsInput(input);
        showResults();
    });

    card.addEventListener('click', evt => {
        const button = evt.target;

        if(button.classList.contains('button')) {
            if(!button.classList.contains('section-results__button')) {
                selectPercentage(button);
                showResults();
            } else {
                resetInputs();
            }
        }
    });

});

function selectPercentage(button) {
    removeSelected();
    tipPercentage = parseInt(button.getAttribute('data-percentage')) / 100;
    button.classList.add('tip-bill__button--selected');
    tipInput.value = '';
}

function customPercentage() {
    removeSelected();
    tipPercentage = parseInt(tipInput.value) / 100;
}

const removeSelected = () => {
    const buttons = card.querySelectorAll('.tip-bill__button');

    buttons.forEach(btn => {
        btn.classList.remove('tip-bill__button--selected');
    });
}

function getBillQuantity() {
    billQuantity = parseFloat(billInput.value).toFixed(2);
    billInput.value = billQuantity;
}

function getPersonsQuantity() {
    const persons = parseInt(personInput.value);

    if(persons > 0) {
        numberOfPeople = persons;
        showError();
    } else
        showError(true);

    personInput.value = numberOfPeople;
}

function showError(error = false) {
    const errorLabel = card.querySelector('.tip-bill__error-text');
    const personInput = card.querySelector('#person-quantity');

    if(error) {
        numberOfPeople = 0;
        errorLabel.classList.add('tip-bill__error-text--show');
        personInput.classList.add('tip-bill__input--error');
    } else {
        errorLabel.classList.remove('tip-bill__error-text--show');
        personInput.classList.remove('tip-bill__input--error');
    }
}

function eventsInput(input) {
    if(input.id === 'bill-quantity')
        getBillQuantity();
    else if(input.id === 'tip-percentage')
        customPercentage();
    else
        getPersonsQuantity();
}

function showResults() {
    const tipAmount = card.querySelector('#tip-amount');
    const personAmount = card.querySelector('#person-amount');

    if(tipPercentage > 0 && billQuantity > 0 && numberOfPeople > 0) {
        const calculateTip = ((billQuantity * tipPercentage) / numberOfPeople).toFixed(2);
        const calculateAmount = (billQuantity / numberOfPeople + parseFloat(calculateTip)).toFixed(2);

        tipAmount.textContent ='$' + calculateTip;
        personAmount.textContent ='$' + calculateAmount;
        resetButton(true);
    } else {
        tipAmount.textContent ='$0.00';
        personAmount.textContent = '0.00';
    }

}

function resetButton(activar) {
    const resetBtn = card.querySelector('.section-results__button');

    if(activar) {
        resetBtn.classList.remove('section-results__button--disabled');
        resetBtn.disabled = false;
    } else {
        resetBtn.classList.add('section-results__button--disabled');
        resetBtn.disabled = true;
    }
}

function resetInputs() {
    tipInput.value = '';
    personInput.value = '';
    billInput.value = '';
    billQuantity = 0;
    tipPercentage = 0;
    numberOfPeople = 0;

    showResults();
    resetButton();
    removeSelected();
}