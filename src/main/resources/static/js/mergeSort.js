const container = document.getElementById('array-container');

let currentIndex = 0;
let interval = null;
let barInitDone = false;


/* =========================
   RENDER MERGE SORT STEP
   ========================= */
function renderStep(step, useAfter = false) {
    const arr = useAfter ? step.afterArray : step.beforeArray;

    if (!barInitDone) {
        BarAnimator.init(arr);
        barInitDone = true;
    } else {
        BarAnimator.moveToArray(arr);
    }

    BarAnimator.clearStateClasses();

    // These exist in your merge sort styling/classes:
    // left-subarray, right-subarray, current-left, current-right
    // We'll apply them if step provides indices/ranges.
    for (let i = 0; i < arr.length; i++) {
        const bar = BarAnimator.getBarAtIndex(i);
        if (!bar) continue;

        // optional ranges (depends on your step object)
        if (step.leftStart != null && step.leftEnd != null && i >= step.leftStart && i <= step.leftEnd) {
            bar.classList.add("left-subarray");
        }
        if (step.rightStart != null && step.rightEnd != null && i >= step.rightStart && i <= step.rightEnd) {
            bar.classList.add("right-subarray");
        }

        // optional pointers (depends on your step object)
        if (i === step.currentLeftIndex) bar.classList.add("current-left");
        if (i === step.currentRightIndex) bar.classList.add("current-right");
    }
}


/* =========================
   STEP CONTROLS
   ========================= */
async function playStep() {
    if (currentIndex >= steps.length) return;

    renderStep(steps[currentIndex],true);
    currentIndex++;

    await new Promise(r => setTimeout(r, 400));
}

async function playStepReverse() {
    if (currentIndex <= 0) return;

    currentIndex--;
    renderStep(steps[currentIndex],true);

    await new Promise(r => setTimeout(r, 400));
}

function nextStep() {
    playStep();
}

function prevStep() {
    playStepReverse();
}

/* =========================
   AUTO PLAY
   ========================= */
async function autoPlay() {
    const autoBtn = document.getElementById('autoBtn');

    if (interval) {
        clearInterval(interval);
        interval = null;
        autoBtn.textContent = 'Auto';
        return;
    }

    autoBtn.textContent = 'Stop';

    interval = setInterval(async () => {
        if (currentIndex >= steps.length) {
            clearInterval(interval);
            interval = null;
            autoBtn.textContent = 'Auto';
            return;
        }

        await playStep();
    }, 700);
}

/* =========================
   BUTTON HOOKS
   ========================= */
document.getElementById('nextBtn').addEventListener('click', nextStep);
document.getElementById('prevBtn').addEventListener('click', prevStep);
document.getElementById('autoBtn').addEventListener('click', autoPlay);

/* =========================
   INITIAL RENDER
   ========================= */
if (steps && steps.length > 0) {
    renderStep(steps[0],true);
}
