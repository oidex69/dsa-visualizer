const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;

function renderLinearSearchStep(step) {
    const arr = step.beforeArray;
    container.innerHTML = '';

    arr.forEach((num, idx) => {
        const div = document.createElement('div');
        div.className = 'array-element';
        div.textContent = num;

        // Current comparing
        if (idx === step.currentIndex) div.classList.add('current');

        // Checked indices
        if (step.checkedIndices.includes(idx)) div.classList.add('current-min');

        // Found target
        if (step.found && idx === step.currentIndex) div.classList.add('sorted');

        container.appendChild(div);
    });
}

async function playStep() {
    if (!steps || currentIndex >= steps.length) return;
    renderLinearSearchStep(steps[currentIndex]);
    currentIndex++;
    await new Promise(r => setTimeout(r, 400));
}

async function playStepReverse() {
    if (!steps || currentIndex <= 0) return;
    currentIndex--;
    renderLinearSearchStep(steps[currentIndex]);
    await new Promise(r => setTimeout(r, 400));
}

function nextStep() { playStep(); }
function prevStep() { playStepReverse(); }

async function autoPlay() {
    const autoBtn = document.getElementById('autoBtn');
    if (interval) {
        clearInterval(interval);
        interval = null;
        autoBtn.textContent = "Auto";
    } else {
        autoBtn.textContent = "Stop";
        interval = setInterval(async () => {
            if (!steps || currentIndex >= steps.length) {
                clearInterval(interval);
                interval = null;
                autoBtn.textContent = "Auto";
            } else {
                await playStep();
            }
        }, 700);
    }
}

document.getElementById('nextBtn').addEventListener('click', nextStep);
document.getElementById('prevBtn').addEventListener('click', prevStep);
document.getElementById('autoBtn').addEventListener('click', autoPlay);

if (steps && steps.length > 0) renderLinearSearchStep(steps[0]);
