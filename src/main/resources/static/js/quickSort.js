const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;
let barInitDone = false;


function renderQuickSortStep(step, useAfter = false) {
    const arr = useAfter ? step.afterArray : step.beforeArray;

    if (!barInitDone) {
        BarAnimator.init(arr);
        barInitDone = true;
    } else {
        BarAnimator.moveToArray(arr);
    }

    BarAnimator.clearStateClasses();

    const sorted = step.sortedIndices || [];

    for (let i = 0; i < arr.length; i++) {
        const bar = BarAnimator.getBarAtIndex(i);
        if (!bar) continue;

        // active partition range
        if (i >= step.low && i <= step.high) bar.classList.add("active-range");

        // pivot
        if (i === step.pivotIndex) bar.classList.add("pivot");

        // compared indices
        if (i === step.indexA) bar.classList.add("current-a");
        if (i === step.indexB) bar.classList.add("current-b");

        // sorted indices
        if (sorted.includes(i)) bar.classList.add("sorted");
    }
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
