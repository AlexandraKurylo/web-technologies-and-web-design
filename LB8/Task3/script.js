const REMEMBER_COOKIE_NAME = "remember_user_90D";
const COOKIE_PATH = "/"; 
const REMEMBER_DURATION_SECONDS = 7776000; 

function setCookie(name, value, seconds, path) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`; 

    if (seconds) {
        cookie += `; max-age=${seconds}`; 
    }
    
    cookie += `; SameSite=Lax`; 

    document.cookie = cookie;
    console.log(`Cookie встановлено: ${name} = ${value}, max-age=${seconds}, path=${path}`);
}

function getCookie(name) {
    const cookies = document.cookie.split('; '); 
    for (let c of cookies) {
        const [key, val] = c.split('=');
        if (key.trim() === encodeURIComponent(name)) { 
            return decodeURIComponent(val);
        }
    }
    return null;
}

function clearCookie(name, path) {
    document.cookie = 
        `${encodeURIComponent(name)}=; max-age=0; path=${path}`;
    console.log(`Cookie видалено: ${name}`);
}

function saveRememberMe() {
    const checkbox = document.getElementById('remember-me-checkbox');
    const isChecked = checkbox.checked;
    
    if (isChecked) {
        setCookie(REMEMBER_COOKIE_NAME, 'true', REMEMBER_DURATION_SECONDS, COOKIE_PATH); 
    } else {
        setCookie(REMEMBER_COOKIE_NAME, 'false', null, COOKIE_PATH); 
    }
    updateStatusDisplay();
}

function resetRememberMe() {
    clearCookie(REMEMBER_COOKIE_NAME, COOKIE_PATH);
    document.getElementById('remember-me-checkbox').checked = false;
    updateStatusDisplay();
}

function updateStatusDisplay() {
    const status = getCookie(REMEMBER_COOKIE_NAME);
    const display = document.getElementById('status-display');
    const checkbox = document.getElementById('remember-me-checkbox');

    display.classList.remove('status-active', 'status-inactive');
    
    if (status === 'true') {
        display.classList.add('status-active');
        display.innerHTML = `
            <div>
                <p>Cookie АКТИВНА</p>
                <p>Значення: <b>TRUE</b></p>
                <p>Дія: <b>90 днів</b></p>
                <p>Шлях: <b>${COOKIE_PATH}</b></p>
            </div>
        `;
        checkbox.checked = true;
    } else if (status === 'false') {
        display.classList.add('status-inactive');
        display.innerHTML = `
            <div>
                <p>Cookie НЕАКТИВНА</p>
                <p>Значення: <b>FALSE</b></p>
                <p>Дія: <b>Тільки сесія</b></p>
                <p>Шлях: <b>${COOKIE_PATH}</b></p>
            </div>
        `;
        checkbox.checked = false;
    } else {
        display.classList.add('status-inactive');
        display.innerHTML = `
            <div>
                <p>Cookie ВІДСУТНЯ.</p>
                <p>Натисніть "Встановити" для збереження статусу.</p>
                <p>Шлях: <b>${COOKIE_PATH}</b></p>
            </div>
        `;
        checkbox.checked = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save-button').addEventListener('click', saveRememberMe);
    document.getElementById('reset-button').addEventListener('click', resetRememberMe);

    updateStatusDisplay();
});