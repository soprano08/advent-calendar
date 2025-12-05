// Ustawienia koła z JSON (Twoje wartości)
const wheelData = {
  entries:[
    {"text":"6","weight":1,"enabled":true},
    {"text":"3","weight":1,"enabled":true},
    {"text":"7","weight":1,"enabled":true},
    {"text":"2","weight":1,"enabled":true},
    {"text":"1","weight":1,"enabled":true},
    {"text":"5","weight":0,"enabled":true}, // pole 5 nigdy się nie wylosuje
    {"text":"4","weight":1,"enabled":true},
    {"text":"8","weight":1,"enabled":true}
  ],
  colorSettings:[
    {"color":"#3369E8","enabled":true},
    {"color":"#D50F25","enabled":true},
    {"color":"#EEB211","enabled":true},
    {"color":"#009925","enabled":true},
    {"color":"#000000","enabled":false},
    {"color":"#000000","enabled":false}
  ]
};

// Mapujemy na spin-wheel
const items = wheelData.entries.map((e, i) => ({
  label: e.text,
  weight: e.weight,
  color: wheelData.colorSettings[i]?.enabled ? wheelData.colorSettings[i].color : '#ccc'
}));

const container = document.getElementById('wheel-container');
const resultEl = document.getElementById('result');

const wheel = new Wheel(container, {
  items,
  radius: 150,
  colors: items.map(i => i.color)
});

document.getElementById('spin').addEventListener('click', () => {
  wheel.spin();
});

wheel.on('rest', (event) => {
  const number = items[event.currentIndex].label;
  resultEl.textContent = 'Wynik: ' + number;
});
