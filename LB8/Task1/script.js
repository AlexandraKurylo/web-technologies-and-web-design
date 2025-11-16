function setCookie(name, value, seconds) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/`; 

    if (seconds) {
        cookie += `; max-age=${seconds}`; 
    }
    
    document.cookie = cookie;
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

function clearCookie() {
    document.cookie = 
        `${encodeURIComponent(COOKIE_NAME)}=; max-age=0; path=/`;

    const visitCountElement = document.getElementById('visitCount');
    if (visitCountElement) {
        visitCountElement.textContent = 0;
    }
    console.log("Лічильник відвідувань скинуто.");
}


const COOKIE_NAME = "visits";
const EXPIRY_SECONDS = 45; 

function visitCounter() {
    let count = getCookie(COOKIE_NAME);
    
    if (count === null) {
        count = 1;
    } else {
        count = Number(count) + 1;
    }
    setCookie(COOKIE_NAME, count, EXPIRY_SECONDS); 
    return count;
}


document.addEventListener('DOMContentLoaded', () => {
    const visitCountElement = document.getElementById('visitCount');

    if (visitCountElement) {
        const currentCount = visitCounter();
        visitCountElement.textContent = currentCount;
    }
});
        