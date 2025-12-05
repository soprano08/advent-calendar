// Wczytanie JSON z Twojego pliku .wheel
fetch('mojekolo.wheel')
  .then(res => res.json())
  .then(data => {
    // Mapujemy segmenty na format spin-wheel
    const items = data.segments.map(s => ({
      label: s.name,
      weight: s.name === "5" ? 0 : 1,  // pole 5 ma 0% szans
      color: s.color || '#ccc'
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
  })
  .catch(err => {
    console.error("Nie udało się wczytać pliku mojekolo.wheel:", err);
  });

