let timer;
let startTime;
let running = false;
let elapsedTimes = [];

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        document.getElementById("startStop").innerText = "Start";
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        running = true;
        document.getElementById("startStop").innerText = "Stop";
    }
}

function updateDisplay() {
    let currentTime = Date.now();
    let elapsedTime = new Date(currentTime - startTime);
    let hours = elapsedTime.getUTCHours().toString().padStart(2, "0");
    let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, "0");
    let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, "0");
    let milliseconds = elapsedTime.getUTCMilliseconds().toString().padStart(3, "0");
    document.getElementById("display").innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function reset() {
    clearInterval(timer);
    running = false;
    document.getElementById("startStop").innerText = "Start";
    document.getElementById("display").innerText = "00:00:00.000";
    elapsedTimes = [];
    renderElapsedTimes();
}

function recordTime() {
    let currentTime = Date.now();
    let elapsedTime = new Date(currentTime - startTime);
    let hours = elapsedTime.getUTCHours().toString().padStart(2, "0");
    let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, "0");
    let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, "0");
    let milliseconds = elapsedTime.getUTCMilliseconds().toString().padStart(3, "0");
    elapsedTimes.push(`${hours}:${minutes}:${seconds}.${milliseconds}`);
    renderElapsedTimes();
}

function renderElapsedTimes() {
    let elapsedTimesContainer = document.getElementById("elapsedTimes");
    elapsedTimesContainer.innerHTML = ""; // Clear previous entries
    elapsedTimes.forEach((time, index) => {
        let listItem = document.createElement("div");
        listItem.textContent = `# ${index + 1}: ${time}`;
        listItem.style.color = "blue";
        listItem.style.paddind = "12px";
        listItem.style.margin = "12px";
        listItem.style.textAlign = 'center';
        listItem.style.fontWeight = 'bold';
        elapsedTimesContainer.appendChild(listItem);
    });
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("record").addEventListener("click", recordTime);
document.getElementById("reset").addEventListener("click", reset);