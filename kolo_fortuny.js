// 🔥 Pola które mogą się wylosować (bez 5)
const availableNumbers = [1, 2, 3, 4, 6, 7, 8];

const spinBtn = document.getElementById("spinBtn");
const resultEl = document.getElementById("result");

// Sprawdź czy już losował (localStorage)
if (localStorage.getItem("wheelUsed") === "true") {
    spinBtn.disabled = true;
    resultEl.textContent = "Wynik: " + localStorage.getItem("wheelResult");
}

spinBtn.addEventListener("click", () => {

    // Jak już losował, blokujemy
    if (localStorage.getItem("wheelUsed") === "true") return;

    // 👉 LOSOWANIE BEZ 5
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const result = availableNumbers[randomIndex];

    // 👉 zapis do localStorage (pamięta nawet po odświeżeniu strony)
    localStorage.setItem("wheelUsed", "true");
    localStorage.setItem("wheelResult", result);

    // 👉 pokazanie wyniku
    resultEl.textContent = "Wynik: " + result;

    // 👉 blokada przycisku
    spinBtn.disabled = true;
});
