function removeError(input) {
    const parent = input.parentNode;
    const errorLabel = parent.querySelector('.error-label');

    if (parent.classList.contains('error')) {
        if (errorLabel) {
            errorLabel.remove();
        }
        parent.classList.remove('error');
        input.classList.remove('input-field-error'); 
    }
}

function createError(input, text) {
    const parent = input.parentNode;

    if (parent.classList.contains('error')) return;

    const errorLabel = document.createElement('label');

    errorLabel.classList.add('error-label');
    errorLabel.textContent = `* ${text}`;

    parent.classList.add('error');
    input.classList.add('input-field-error'); 

    parent.append(errorLabel);
}


function validateNameChars(value) {
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
    
        if (char.toLowerCase() !== char.toUpperCase() || char === ' ' || char === '-') {
            continue; 
        }

        return false;
    }
    
    return true;
}


function validateEmailFormat(value) {
    const atIndex = value.indexOf('@');
    const dotIndex = value.lastIndexOf('.');

    if (atIndex === -1 || dotIndex === -1) {
        return false;
    }

    if (atIndex === 0) {
        return false;
    }

    if (dotIndex < atIndex + 2) {
        return false;
    }
    
    if (dotIndex === value.length - 1) {
        return false;
    }

    return true;
}

//Головна функція валідації форми
function validation(form) {
    let result = true;
    const allFields = form.querySelectorAll('input, textarea');

    for (const field of allFields) {
        removeError(field);
        const value = field.value.trim();

        const isRequired = field.dataset.required === "true";
        
        if (isRequired && value === "") {
            createError(field, 'The field is not filled in!');
            result = false;
            continue;
        }

        if (!isRequired && value === "") {
            continue;
        }

        // 2. Перевірка довжини
        const minLength = field.dataset.minLength ? parseInt(field.dataset.minLength) : null;
        const maxLength = field.dataset.maxLength ? parseInt(field.dataset.maxLength) : null;

        if (minLength && value.length < minLength) {
            createError(field, `Мінімальна довжина: ${minLength} символів.`);
            result = false;
        }

        if (maxLength && value.length > maxLength) {
            createError(field, `Максимальна довжина: ${maxLength} символів.`);
            result = false;
        }


        // 3. Валідація за типом (data-type)
        const dataType = field.dataset.type;

        switch (dataType) {
            case 'name':
                if (!validateNameChars(value)) {
                    createError(field, `Дозволені лише літери, пробіл та дефіс.`);
                    result = false;
                }
                break;
            case 'age':
                const age = parseFloat(value);
                const minAge = 18; 
                const maxAge = 130; 
                const isWholeNumber = age % 1 === 0; 
                if (isNaN(age) || !isWholeNumber || age < minAge || age > maxAge) {
                    createError(field, `Повинно бути ціле число від ${minAge} до ${maxAge}.`);
                    result = false;
                }
                break;
            case 'email':
                if (!validateEmailFormat(value)) {
                    createError(field, `Некоректний формат електронної пошти.`);
                    result = false;
                }
                break;
            case 'url':
                const startsWithHttp = value.startsWith('http://');
                const startsWithHttps = value.startsWith('https://');
                const hasDot = value.indexOf('.') !== -1;
                if (value !== "") {
                    if ( !(startsWithHttp || startsWithHttps) || !hasDot ) {
                        createError(field, `URL має починатися з 'http://' або 'https://' та містити крапку.`);
                        result = false;
                    }
                }
                break;
        }
    }

    return result
}

document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (validation(this) === true) {
        alert('Форма перевірена успішно! Можна відправляти.');
    }
});

document.getElementById('add-form').addEventListener('focusin', function(event) {
    if (event.target.matches('input, textarea')) {
        removeError(event.target);
    }
});

