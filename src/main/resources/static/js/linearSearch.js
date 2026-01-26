const container = document.getElementById("array-container");
let currentIndex = 0;
let interval;
let barInitDone = false;

// Render a single step
function renderLinearSearchStep(step) {
  const arr = step.beforeArray || step.array || step.arr || [];

  // Initialize bars if first time
  if (!barInitDone) {
    BarAnimator.init(arr, step.target); // pass target
    barInitDone = true;
  }

  // Clear only current/sorted highlights (do NOT touch target bubble)
  BarAnimator.clearStateClasses();

  for (let i = 0; i < arr.length; i++) {
    const bar = BarAnimator.getBarAtIndex(i);
    if (!bar) continue;

    // Highlight the current index
    if (i === step.currentIndex || i === step.index || i === step.i) {
      bar.classList.add("current");
    }

    // Mark found index green if found
    if (step.found === true && arr[i] === step.target) {
      bar.classList.add("sorted");
    }
  }
}

// STEP CONTROLS
async function playStep() {
  if (!steps || currentIndex >= steps.length) return;
  renderLinearSearchStep(steps[currentIndex]);
  currentIndex++;
  await new Promise((r) => setTimeout(r, 500));
}

async function playStepReverse() {
  if (!steps || currentIndex <= 0) return;
  currentIndex--;
  renderLinearSearchStep(steps[currentIndex]);
  await new Promise((r) => setTimeout(r, 500));
}

function nextStep() { playStep(); }
function prevStep() { playStepReverse(); }

async function autoPlay() {
  const autoBtn = document.getElementById("autoBtn");
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

// Button events
document.getElementById("nextBtn").addEventListener("click", nextStep);
document.getElementById("prevBtn").addEventListener("click", prevStep);
document.getElementById("autoBtn").addEventListener("click", autoPlay);

// Render first step
if (steps && steps.length > 0) renderLinearSearchStep(steps[0]);
