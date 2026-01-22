const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;

function renderQuickSortStep(step) {
    const arr = step.afterArray;
    container.innerHTML = '';

    const sorted = step.sortedIndices || [];

    arr.forEach((num, idx) => {
        const div = document.createElement('div');
        div.className = 'array-element';
        div.textContent = num;

        // Active partition (low–high)
        if (idx >= step.low && idx <= step.high) {
            div.classList.add('active-range');
        }

        // Pivot element
        if (idx === step.pivotIndex) {
            div.classList.add('pivot');
        }

        // Compared / swapped indices
        if (idx === step.indexA) {
            div.classList.add('current-a');
        }
        if (idx === step.indexB) {
            div.classList.add('current-b');
        }

        // Finalized elements
        if (sorted.includes(idx)) {
            div.classList.add('sorted');
        }

        container.appendChild(div);
    });
}


async function playStep() {
    if (currentIndex >= steps.length) return;
    const step = steps[currentIndex];

    // Render current quick sort step
    renderQuickSortStep(step);
    await new Promise(r => setTimeout(r, 400));

    currentIndex++;
}

async function playStepReverse() {
    if (currentIndex <= 0) return;
    currentIndex--;
    const step = steps[currentIndex];

    renderQuickSortStep(step);
    await new Promise(r => setTimeout(r, 400));
}

function nextStep() {
    playStep();
}

function prevStep() {
    playStepReverse();
}

async function autoPlay() {
    const autoBtn = document.getElementById('autoBtn');
    if (interval) {
        clearInterval(interval);
        interval = null;
        autoBtn.textContent = "Auto";
    } else {
        autoBtn.textContent = "Stop";
        interval = setInterval(async () => {
            if (currentIndex >= steps.length) {
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
if (steps && steps.length > 0)
    renderQuickSortStep(steps[0]);
