const calendar = document.getElementById('calendar');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');

const messages = [
    "Wesołych Świąt!", "Czekoladka 1", "Czekoladka 2", "Czekoladka 3",
    "Czekoladka 4", "Czekoladka 5", "Czekoladka 6", "Czekoladka 7",
    "Czekoladka 8", "Czekoladka 9", "Czekoladka 10", "Czekoladka 11",
    "Czekoladka 12", "Czekoladka 13", "Czekoladka 14", "Czekoladka 15",
    "Czekoladka 16", "Czekoladka 17", "Czekoladka 18", "Czekoladka 19",
    "Czekoladka 20", "Czekoladka 21", "Czekoladka 22", "Czekoladka 23",
    "Czekoladka 24"
];

// Generowanie drzwi
for (let i=1; i<=24; i++){
    const door = document.createElement('div');
    door.className = 'door';
    door.dataset.day = i;

    const inner = document.createElement('div');
    inner.className = 'door-inner';

    const front = document.createElement('div');
    front.className = 'door-front';
    front.textContent = i;

    const back = document.createElement('div');
    back.className = 'door-back';
    back.textContent = messages[i-1];

    inner.appendChild(front);
    inner.appendChild(back);
    door.appendChild(inner);
    calendar.appendChild(door);

    door.addEventListener('click', () => {
        const today = new Date().getDate(); // aktualny dzień miesiąca
        if (i <= today){
            door.classList.add('opened');
        } else {
            popupText.textContent = "Uuuu, nie oszukuj!";
            popup.style.display = 'flex';
        }
    });
}

// Popup close
popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

// --- Śnieg ---
function createSnowflake(){
    const snow = document.createElement('div');
    snow.className = 'snowflake';
    snow.textContent = '❄';
    snow.style.left = Math.random() * window.innerWidth + 'px';
    snow.style.fontSize = (Math.random() * 15 + 10) + 'px';
    snow.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 10000);
}
setInterval(createSnowflake, 100);
