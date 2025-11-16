const COOKIE_NAME = "trial_active_state_55X";
const TRIAL_DURATION_SECONDS = 100;
const COOKIE_PATH = "/app/test";
const USER_ID = "XYZ-2024-" + Math.floor(Math.random() * 1000); 

let intervalId = null; 

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

function startTrial() {
    const startTimeMs = Date.now();
    const cookieValue = `${startTimeMs}__${USER_ID}`;
    
    setCookie(COOKIE_NAME, cookieValue, TRIAL_DURATION_SECONDS, COOKIE_PATH);
    
    checkTrialStatus();
}

function stopTrial() {
    clearCookie(COOKIE_NAME, COOKIE_PATH);
    checkTrialStatus();
}


function checkTrialStatus() {
    const cookieData = getCookie(COOKIE_NAME); 
    const statusDisplay = document.getElementById('status-display');
    
    if (intervalId) {
        clearInterval(intervalId);
    }

    if (statusDisplay) {
        statusDisplay.classList.remove('active-status', 'inactive-status');
    }
    
    if (cookieData) {
        const [startTimeMsStr] = cookieData.split('__');
        const startTimeMs = Number(startTimeMsStr);

        const endTimeMs = startTimeMs + (TRIAL_DURATION_SECONDS * 1000);
        
        const updateCountdown = () => {
            const currentTimeMs = Date.now();
            const timeRemainingMs = endTimeMs - currentTimeMs;
            
            if (timeRemainingMs > 0) {
                const timeRemainingSeconds = Math.ceil(timeRemainingMs / 1000);
                
                if (statusDisplay) {
                   statusDisplay.classList.add('active-status'); 
                }
                
                statusDisplay.innerHTML = `
                    <div>
                        <span class="status-title-active">Тестовий період активний!</span>
                        <span class="status-text-active">Залишилося: <span class="status-highlight">${timeRemainingSeconds}</span> секунд.</span>
                        <span class="status-info">ID початку: ${startTimeMsStr}</span>
                        <span class="status-info">Користувач: ${USER_ID}</span>
                    </div>
                `;
            } else {
                clearCookie(COOKIE_NAME, COOKIE_PATH);
                checkTrialStatus(); 
            }
        };

        intervalId = setInterval(updateCountdown, 1000);
        updateCountdown(); 
        
    } else {
        if (statusDisplay) {
            statusDisplay.classList.add('inactive-status');
        }
        
        statusDisplay.innerHTML = `
            <div>
                <span class="status-title-inactive">Тестовий період закінчився</span>
                <span class="status-text-inactive">або ще не починався. Натисніть "Почати Test".</span>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startTrial);
    document.getElementById('reset-button').addEventListener('click', stopTrial);

    checkTrialStatus();
});