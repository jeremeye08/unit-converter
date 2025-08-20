const convertEl = document.getElementById('convert-btn');
let inputEl = document.getElementById('user-input')
let userValue = document.querySelectorAll('.user-value')
let feetEl = document.getElementById('feet')
let metresEl = document.getElementById('metres')
let gallonsEl = document.getElementById('gallons')
let litresEl = document.getElementById('litres')
let poundsEl = document.getElementById('pounds')
let kilosEl = document.getElementById('kilos')

function validateInput(event) {

    const value = event.target.value
    const lastChar = value[value.length-1]
    const hasDecimal = value.slice(0,value.length-1).includes('.')

    console.log({value}) // was put in curly brackets to easily identify the log

    if(!value || (value.length === 1 && lastChar === '.')) {
        inputEl.value = '' // if there is value is falsy OR if length of the value is 1 AND 
        // the last character (which is the first character because the character length is 1) 
        // is a dot THEN don't add the last character (equate value to empty string)
        return;
    }

    if(value.length > 7) { // only allows 7 characters including the decimal point
        inputEl.value = value.substring(0,7); // substring only takes the first 7 characters; 
        // starts from 0, ends at 7 (7 --> 8th character is not a part of it)
        return;
    }

    if((lastChar >= '0' && lastChar <= '9') || (lastChar === '.' && !hasDecimal)) {
        inputEl.value = value;
    } else {
        inputEl.value = value.slice(0,value.length-1)
    }
}

function toFeet() {
    let feet
    feet = (Number(inputEl.value) * 3.281).toFixed(3)
    feetEl.textContent = feet
}

function toMetres() {
    let metres
    metres = (Number(inputEl.value) / 3.281).toFixed(3)
    metresEl.textContent = metres
}

function toGallons() {
    let gallons
    gallons = (Number(inputEl.value) / 0.264).toFixed(3)
    gallonsEl.textContent = gallons
}

function toLitres() {
    let litres
    litres = (Number(inputEl.value) * 0.264).toFixed(3)
    litresEl.textContent = litres
}

function toPounds() {
    let pounds
    pounds = (Number(inputEl.value) * 2.204).toFixed(3)
    poundsEl.textContent = pounds
}

function toKilos() {
    let kilos
    kilos = (Number(inputEl.value) / 2.204).toFixed(3)
    kilosEl.textContent = kilos
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    toast.style.display = 'block';
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.style.display = 'none';
        },400)
    },1200)
}

convertEl.addEventListener('click', function() {
    userValue.forEach(element => element.textContent = inputEl.value);
    
    if(inputEl.value) {
        toFeet();
        toMetres();
        toGallons();
        toLitres();
        toPounds();
        toKilos();
    }
})

document.querySelectorAll('.highlight').forEach(span => {
    span.addEventListener('click', function() {
        let copiedNumber = span.textContent
        console.log({copiedNumber})
        navigator.clipboard.writeText(span.textContent);
        showToast("Copied!")
    })
})