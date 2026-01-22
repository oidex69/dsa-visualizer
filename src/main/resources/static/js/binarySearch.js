const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;

function renderBinarySearchStep(step) {
    const arr = step.beforeArray;
    container.innerHTML = '';

    arr.forEach((num, idx) => {
        const div = document.createElement('div');
        div.className = 'array-element';
        div.textContent = num;

        // Elements outside current search range (greyed out)
        if (idx < step.low || idx > step.high) {
            div.style.backgroundColor = '#ccc';
        }

        // Current mid element
        if (idx === step.mid) {
            div.classList.add(step.found ? 'sorted' : 'current'); // green if found, yellow otherwise
        }

        // Low and High borders
        if (idx === step.low) div.style.border = '2px solid blue';
        if (idx === step.high) div.style.border = '2px solid red';

        container.appendChild(div);
    });
}

// =========================
// STEP CONTROLS
// =========================
async function playStep() {
    if (!steps || currentIndex >= steps.length) return;
    const step = steps[currentIndex];

    renderBinarySearchStep(step);
    currentIndex++;
    await new Promise(r => setTimeout(r, 700));
}

async function playStepReverse() {
    if (!steps || currentIndex <= 0) return;
    currentIndex--;
    const step = steps[currentIndex];

    renderBinarySearchStep(step);
    await new Promise(r => setTimeout(r, 700));
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
        }, 1000);
    }
}

// Attach buttons
document.getElementById('nextBtn').addEventListener('click', nextStep);
document.getElementById('prevBtn').addEventListener('click', prevStep);
document.getElementById('autoBtn').addEventListener('click', autoPlay);

// Initial render
if (steps && steps.length > 0) renderBinarySearchStep(steps[0]);
