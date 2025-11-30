const messages = {
1:"Wesołego grudnia! ❄️",2:"Miłego dnia 💙",3:"Jesteś super!",
4:"Ciepła herbata i kocyk ☕",5:"Uśmiech proszę 😄",6:"Jesteś ważna!",
7:"Zimowa magia dla Sylwii ✨",8:"Dziś będzie pięknie!",9:"Buziak 💋",
10:"Jesteś wyjątkowa",11:"Czas na relaks~",12:"Dobra energia dla Ciebie",
13:"Małe szczęścia są najważniejsze",14:"Dziś będzie lekko ❄️",15:"You got this!",
16:"Grudniowy vibe 🎶",17:"Dla najfajniejszej Sylwii",18:"Jesteś kochana",
19:"Ciepłe myśli ✨",20:"Zrób coś miłego dla siebie",21:"Uśmiech działa cuda",
22:"Dobre rzeczy nadchodzą",23:"Prawie święta! 🎄",24:"Wesołych Świąt Sylwia! 🎁"
};

const today = new Date().getMonth() === 11 ? new Date().getDate() : 1;

document.querySelectorAll('.door').forEach(door=>{
    door.addEventListener('click', ()=>{
        const day = parseInt(door.dataset.day);
        if(day <= today){
            door.classList.add('opened');

            const popup = document.createElement('div');
            popup.className='popup';
            popup.innerHTML=`<div class="popup-box"><h2>Dzień ${day}</h2><p>${messages[day]}</p><button>Zamknij</button></div>`;
            document.body.appendChild(popup);
            popup.querySelector('button').onclick = ()=> popup.remove();
        } else {
            const popup = document.createElement('div');
            popup.className='popup';
            popup.innerHTML=`<div class="popup-box"><h2>Uuuu!</h2><p>Nie oszukuj! 🔒</p><button>Zamknij</button></div>`;
            document.body.appendChild(popup);
            popup.querySelector('button').onclick = ()=> popup.remove();
        }
    });
});
