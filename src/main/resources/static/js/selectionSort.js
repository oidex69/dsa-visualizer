
const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;
let barInitDone = false; //bar initialization

function renderStep(step, useAfter = false) {
    const arr = useAfter ? step.afterArray : step.beforeArray;

    const current = [step.index1, step.index2].filter(i => i >= 0);
    const currentMinIndex = step.currentMinIndex >= 0 ? [step.currentMinIndex] : [];
    const sorted = step.sortedIndices || [];

    // init once, then animate
    if (!barInitDone) {
        BarAnimator.init(arr);
        barInitDone = true;
    } else {
        BarAnimator.moveToArray(arr);
    }

    // clear + reapply highlight classes
    BarAnimator.clearStateClasses();

    for (let idx = 0; idx < arr.length; idx++) {
        const bar = BarAnimator.getBarAtIndex(idx);
        if (!bar) continue;

        if (current.includes(idx)) bar.classList.add('current');
        if (currentMinIndex.includes(idx)) bar.classList.add('current-min');
        if (sorted.includes(idx)) bar.classList.add('sorted');
    }
}


async function playStep() {
    if (currentIndex >= steps.length) return;
    const step = steps[currentIndex];

    console.log(`Step ${currentIndex+1}: Comparing indices ${step.index1},${step.index2}`);
    console.log(`Array before swap: [${step.beforeArray.join(', ')}]`);

    // Highlight comparison
    renderStep(step, false);
    await new Promise(r => setTimeout(r, 400));

    // Swap if occurred
    if (JSON.stringify(step.beforeArray) !== JSON.stringify(step.afterArray)) {
        console.log('Swapping elements');
        renderStep(step, true);
        await new Promise(r => setTimeout(r, 400));
    } else {
        console.log('No swap needed');
    }

    console.log(`Array after step: [${step.afterArray.join(', ')}]`);
    currentIndex++;
}

async function playStepReverse() {
    if (currentIndex <= 0) return;
    currentIndex--;
    const step = steps[currentIndex];

    console.log(`Step ${currentIndex+1} (Reverse): Comparing indices ${step.index1},${step.index2}`);
    console.log(`Array after step: [${step.afterArray.join(', ')}]`);

    // Show "after swap" first (current state)
    renderStep(step, true);
    await new Promise(r => setTimeout(r, 400));

    // Then show "before swap" (undo swap)
    if (JSON.stringify(step.beforeArray) !== JSON.stringify(step.afterArray)) {
        console.log('Reverting swap');
        renderStep(step, false);
        await new Promise(r => setTimeout(r, 400));
    } else {
        console.log('No swap to revert');
    }

    console.log(`Array before step: [${step.beforeArray.join(', ')}]`);
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

document.getElementById('nextBtn').addEventListener('click', nextStep);
document.getElementById('prevBtn').addEventListener('click', prevStep);
document.getElementById('autoBtn').addEventListener('click', autoPlay);

// Initial render
renderStep(steps[0]);