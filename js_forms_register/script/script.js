//VARIABLER HTML ELEMENT
const form = document.getElementById('form')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm_password')
const dateOfBirth = document.getElementById('date_of_birth')
const address = document.getElementById('address')
const zipCode = document.getElementById('zip_code')
const submit = document.getElementById('submit')

//ARRAY FÖR HTML VARIABLER
let form_value_array = [firstName, lastName, email, password, confirmPassword, dateOfBirth, address, zipCode]

let success_submit = 0;

//VALIDERAR LÄNGD MED REGULAR EXPRESSION
function check_length(element) {
    
    const regEx_length = /^([A-Za-z]).{1,}$/;
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')
    if(!regEx_length.test(element.value)) {
        error_text.innerText = `You need at least 2 letters.`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

//VALIDERAR EXAKT LÄNGD MED REGULAR EXPRESSION
function check_exact(element) {
    const regEx_exact = /^([0-9]{5})$/;
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')
    if(!regEx_exact.test(element.value)) {
        error_text.innerText = `You need exactly 5 numbers, only numbers.`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

//VALIDERAR EMAIL ADRESSER MED REGULAR EXPRESSION. MIN KRAV EX: a@a.se
function check_email(element) {
    const regEx_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')
    if(!regEx_email.test(element.value)) {
        error_text.innerText = `You need a valid email address.`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

//VALIDERAR LÖSENORD MED REGULAR EXPRESSION. KRAV PÅ 8 TECKEN - 3 LOWERCASE 2 UPPERCASE 2 SIFFROR 
function check_password(element) {
    const regEx_password = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,}).{8,}$/;
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')
    if(!regEx_password.test(element.value)) {
        error_text.innerText = `Min req.(8-char) 3-lowercase 2-uppercase 2-numbers.`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

//KONTROLLERAR CONFIRM PASSWORD SÅ ATT DET STÄMMER ÖVERENS MED PASSWORD
function check_confirmed_password(key, key2) {
    const form_manager = confirmPassword.parentElement
    const error_text = form_manager.querySelector('small')

    if(key === key2) {
         error_text.innerText = ``;
         form_manager.className = 'form_manager'
    }else {
        error_text.innerText = `It needs to match 'password'`;
        form_manager.className = 'form_manager border_warning'
    }
}

//KONTROLL AV INPUT. DRAR AV {DATE OF BIRTH} FRÅN DAGENS DATUM FÖR ATT VALIDERA OM DU ÄR 18 ÅR 
//(GRATULERAR DIG PÅ FÖDELSEDAGEN OM DU FYLLER ÅR IDAG.)
function check_date(element) {
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')

    let day_today = new Date();
    let birth_day = new Date(element.value)

    if(birth_day == 'Invalid Date' || element.value.length < 10  ) {
        error_text.innerText = `This is not a valid date input. Submit to validate.`;
        form_manager.className = 'form_manager border_warning'
    } else {
        let year = day_today.getFullYear() - birth_day.getFullYear()
        let days = (day_today.getDate() + ((day_today.getMonth() - 1) * 30)) - (birth_day.getDate() + ((birth_day.getMonth() - 1) * 30))
        if( days < 0) { year -= 1; }
        if( days === 0 && year >= 0) {  alert("Happy birthday!"); }
        if( year < 0) { alert('You are not born yet!')}

        if(year < 18) {
            error_text.innerText = `You need to be at least 18 years old`;
            form_manager.className = 'form_manager border_warning'
        } else {
            error_text.innerText = ``;
            form_manager.className = 'form_manager'
        }
    }
}

//KONTROLLERAR ALLA FÄLT FÖRUTOM {DATE OF BIRTH} PÅ KEY UP
firstName.addEventListener('keyup', function(e) {
    check_length(e.target)
})
lastName.addEventListener('keyup', function(e) {
    check_length(e.target)
})
email.addEventListener('keyup', function(e) {
    check_email(e.target)
})
password.addEventListener('keyup', function(e) {
    check_password(e.target)
})
confirmPassword.addEventListener('keyup', function(e) {
    check_confirmed_password(confirmPassword.value, password.value)
})
address.addEventListener('keyup', function(e) {
    check_length(e.target, 2)    
})
zipCode.addEventListener('keyup', function(e) {
    check_exact(e.target)
})

//KONTROLLERAR ALLA FÄLT VID SUBMIT
form.addEventListener('submit', function(e) {
    
    e.preventDefault()
    form_value_array.forEach(element => {
        switch(element.id) {
            
            case 'firstname':
                check_length(element)
                break;
            case 'lastname':
                check_length(element)
                break;
            case 'email':
                check_email(element)
                break;
            case 'password':
                check_password(element)
                break;
            case 'confirm_password':
                check_confirmed_password(element.value, password.value)
                break;
            case 'date_of_birth':
                check_date(element)
                break;
            case 'address':
                check_length(element)
                break;
            case 'zip_code':
                check_exact(element)
                break;
        }
    });
})