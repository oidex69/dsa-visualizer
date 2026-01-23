const container = document.getElementById("array-container");
let currentIndex = 0;
let interval;
let barInitDone = false;

function showTargetMarker(bar, value) {
  // remove existing marker
  const old = bar.querySelector(".target-marker");
  if (old) old.remove();

  const marker = document.createElement("div");
  marker.className = "target-marker";
  marker.textContent = `Target: ${value}`;
  bar.appendChild(marker);
}

function renderLinearSearchStep(step) {
  const arr = step.beforeArray || step.array || step.arr; // fallback safe
  const target = step.target ?? step.key ?? step.searchValue;

  if (!barInitDone) {
    BarAnimator.init(arr);
    barInitDone = true;
  }

  BarAnimator.clearStateClasses();

  for (let i = 0; i < arr.length; i++) {
    const bar = BarAnimator.getBarAtIndex(i);

    // show target marker on the currently checked index
    if (i === step.currentIndex || i === step.index || i === step.i) {
      showTargetMarker(bar, target);
    }

    if (!bar) continue;

    // highlight checked index (common step field names)
    if (i === step.currentIndex || i === step.index || i === step.i) {
      bar.classList.add("current");
    }

    // found index (if present)
    if (step.foundIndex != null && i === step.foundIndex) {
      bar.classList.add("sorted");
    }
    if (
      step.found === true &&
      (i === step.currentIndex || i === step.index || i === step.i)
    ) {
      bar.classList.add("sorted");
    }
  }
}

async function playStep() {
  if (!steps || currentIndex >= steps.length) return;
  renderLinearSearchStep(steps[currentIndex]);
  currentIndex++;
  await new Promise((r) => setTimeout(r, 400));
}

async function playStepReverse() {
  if (!steps || currentIndex <= 0) return;
  currentIndex--;
  renderLinearSearchStep(steps[currentIndex]);
  await new Promise((r) => setTimeout(r, 400));
}

function nextStep() {
  playStep();
}
function prevStep() {
  playStepReverse();
}

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

document.getElementById("nextBtn").addEventListener("click", nextStep);
document.getElementById("prevBtn").addEventListener("click", prevStep);
document.getElementById("autoBtn").addEventListener("click", autoPlay);

if (steps && steps.length > 0) renderLinearSearchStep(steps[0]);
