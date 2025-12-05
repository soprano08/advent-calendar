// Tworzymy koło z 8 równymi polami ale 5 ma 0% szans
let theWheel = new Winwheel({
    numSegments: 8,
    outerRadius: 230,
    textFontSize: 24,
    segments: [
        { text: "1", weight: 1 },
        { text: "2", weight: 1 },
        { text: "3", weight: 1 },
        { text: "4", weight: 1 },
        { text: "5", weight: 0 },  // ZERO SZANS
        { text: "6", weight: 1 },
        { text: "7", weight: 1 },
        { text: "8", weight: 1 }
    ],
    animation: {
        type: "spinToStop",
        duration: 5,
        spins: 8,
        callbackFinished: showResult
    }
});

function showResult(indicatedSegment) {
    document.getElementById("result").innerHTML =
        "Wylosowano: " + indicatedSegment.text;
}

document.getElementById("spinBtn").addEventListener("click", () => {
    theWheel.startAnimation();
});
