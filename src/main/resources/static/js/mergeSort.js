const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;

function renderMergeStep(step) {
    const arr = step.afterArray; // array after current merge step
    container.innerHTML = '';

    // step.sortedIndices will contain indices that are finalized in this step
    const sorted = step.sortedIndices || [];

    arr.forEach((num, idx) => {
        const div = document.createElement('div');
        div.className = 'array-element';
        div.textContent = num;

        // Highlight left and right subarrays being merged
        if (idx >= step.leftStart && idx <= step.leftEnd) div.classList.add('left-subarray');
        if (idx >= step.rightStart && idx <= step.rightEnd) div.classList.add('right-subarray');

        // Highlight elements currently being compared
        if (idx === step.comparingIndexLeft) div.classList.add('current-left');
        if (idx === step.comparingIndexRight) div.classList.add('current-right');

        // Mark as sorted if finalized
        if (sorted.includes(idx))
            div.classList.add('sorted');

        container.appendChild(div);
    });
}

async function playStep() {
    if (currentIndex >= steps.length) return;
    const step = steps[currentIndex];

    // Render current merge step
    renderMergeStep(step);
    await new Promise(r => setTimeout(r, 400));

    currentIndex++;
}

async function playStepReverse() {
    if (currentIndex <= 0) return;
    currentIndex--;
    const step = steps[currentIndex];

    renderMergeStep(step);
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
    renderMergeStep(steps[0]);
