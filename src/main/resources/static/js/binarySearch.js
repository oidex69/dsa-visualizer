const container = document.getElementById("array-container");
let currentIndex = 0;
let interval;
let barInitDone = false;

function showTargetMarker(bar, value) {
  const old = bar.querySelector(".target-marker");
  if (old) old.remove();

  const marker = document.createElement("div");
  marker.className = "target-marker";
  marker.textContent = `Target: ${value}`;
  bar.appendChild(marker);
}

function renderBinarySearchStep(step) {
  const arr = step.beforeArray || step.array || step.arr;
  const target = 5;

  if (!barInitDone) {
    BarAnimator.init(arr);
    barInitDone = true;
  }

  BarAnimator.clearStateClasses();

  const low = step.low;
  const high = step.high;
  const mid = step.mid;

  for (let i = 0; i < arr.length; i++) {
    const bar = BarAnimator.getBarAtIndex(i);
    if (!bar) continue;

    // outside active range = grey (same behavior you had before)
    if (low != null && high != null && (i < low || i > high)) {
      bar.style.backgroundColor = "#ccc";
    }

    // mark low/high borders
    if (i === low) bar.style.border = "2px solid blue";
    if (i === high) bar.style.border = "2px solid red";

    if (i === mid) {
      showTargetMarker(bar, target);

      if (
        step.found === true ||
        step.isFound === true ||
        step.foundIndex === mid
      ) {
        bar.classList.add("sorted");
      } else {
        bar.classList.add("current");
      }
    }

  }
}

// =========================
// STEP CONTROLS
// =========================
async function playStep() {
  if (!steps || currentIndex >= steps.length) return;
  const step = steps[currentIndex];

  renderBinarySearchStep(step);
  currentIndex++;
  await new Promise((r) => setTimeout(r, 700));
}

async function playStepReverse() {
  if (!steps || currentIndex <= 0) return;
  currentIndex--;
  const step = steps[currentIndex];

  renderBinarySearchStep(step);
  await new Promise((r) => setTimeout(r, 700));
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
    }, 1000);
  }
}

// Attach buttons
document.getElementById("nextBtn").addEventListener("click", nextStep);
document.getElementById("prevBtn").addEventListener("click", prevStep);
document.getElementById("autoBtn").addEventListener("click", autoPlay);

// Initial render
if (steps && steps.length > 0) renderBinarySearchStep(steps[0]);
