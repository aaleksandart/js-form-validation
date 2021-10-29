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

let form_value_array = [firstName, lastName, email, password, confirmPassword, dateOfBirth, address, zipCode]

function validate_length(element, min_length) {
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')

    if(element.value.length < min_length) {
        error_text.innerText = `You need at least ${min_length} characters`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

function check_password(element) {
    const regEx_password = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,}).{8,}$/;
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')
    if(!regEx_password.test(element.value)) {
        error_text.innerText = `Min req. 3-lowercase 2-uppercase 2-numbers`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

function more_or_less(element, min_length) {
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')

    if(element.value.length < min_length) {
        error_text.innerText = `You need exactly ${min_length} characters`
        form_manager.className = 'form_manager border_warning'
    } else if(element.value.length > min_length) {
        error_text.innerText = `You need exactly ${min_length} characters`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
            form_manager.className = 'form_manager'
    }
}

function check_email(element) {
    const regEx_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')
    if(!regEx_email.test(element.value)) {
        error_text.innerText = `You need a valid email address`
        form_manager.className = 'form_manager border_warning'
    } else {
        error_text.innerText = ``
        form_manager.className = 'form_manager'
    }
}

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

function check_date(element) {
    const form_manager = element.parentElement
    const error_text = form_manager.querySelector('small')

    let day_today = new Date();
    let birth_day = new Date(element.value)

    if(birth_day == 'Invalid Date') {
        error_text.innerText = `This is not a valid date input.`;
        form_manager.className = 'form_manager border_warning'
    } else {
        let year = day_today.getFullYear() - birth_day.getFullYear()
        let days = (day_today.getDate() + ((day_today.getMonth() - 1) * 30)) - (birth_day.getDate() + ((birth_day.getMonth() - 1) * 30))
        if( days < 0) { year -= 1; }
        if( days === 0) {  alert("Happy birthday!"); }

        if(year < 18) {
            error_text.innerText = `You need to be at least 18 years old`;
            form_manager.className = 'form_manager border_warning'
        } else {
            error_text.innerText = ``;
            form_manager.className = 'form_manager'
        }
    }
}

firstName.addEventListener('keyup', function(e) {
    validate_length(e.target, 2)
})
lastName.addEventListener('keyup', function(e) {
    validate_length(e.target, 2)
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
    validate_length(e.target, 2)    
})
zipCode.addEventListener('keyup', function(e) {
    more_or_less(e.target, 5)
})

form.addEventListener('submit', function(e) {

    e.preventDefault()
    form_value_array.forEach(element => {
        switch(element.id) {
            
            case 'firstname':
                validate_length(element, 2)
                console.log(element.id)
                break;
            case 'lastname':
                validate_length(element, 2)
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
                validate_length(element, 2)
                break;
            case 'zip_code':
                more_or_less(element, 5)
                break;
        }
    });
})