const container = document.getElementById('array-container');
let currentIndex = 0;
let interval;
let barInitDone = false;


function renderLinearSearchStep(step) {
    const arr = step.beforeArray || step.array || step.arr; // fallback safe

    if (!barInitDone) {
        BarAnimator.init(arr);
        barInitDone = true;
    }

    BarAnimator.clearStateClasses();

    for (let i = 0; i < arr.length; i++) {
        const bar = BarAnimator.getBarAtIndex(i);
        if (!bar) continue;

        // highlight checked index (common step field names)
        if (i === step.currentIndex || i === step.index || i === step.i) {
            bar.classList.add("current");
        }

        // found index (if present)
        if (step.foundIndex != null && i === step.foundIndex) {
            bar.classList.add("sorted");
        }
        if (step.found === true && (i === step.currentIndex || i === step.index || i === step.i)) {
            bar.classList.add("sorted");
        }
    }
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
