const container = document.getElementById("array-container");
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

  // ✅ accept alternate field names safely
  const low = step.low ?? step.left ?? step.l;
  const high = step.high ?? step.right ?? step.h;

  const pivotIndex = step.pivotIndex ?? step.pivot ?? step.pivotPos;

  const indexA = step.indexA ?? step.i ?? step.index1;
  const indexB = step.indexB ?? step.j ?? step.index2;

  for (let i = 0; i < arr.length; i++) {
    const bar = BarAnimator.getBarAtIndex(i);
    if (!bar) continue;

    // Reset any leftover inline styles (important if you used them elsewhere)
    bar.style.border = "";
    bar.style.backgroundColor = "";

    if (low != null && high != null && i >= low && i <= high)
      bar.classList.add("active-range");
    if (pivotIndex != null && i === pivotIndex) bar.classList.add("pivot");
    if (indexA != null && i === indexA) bar.classList.add("current-a");
    if (indexB != null && i === indexB) bar.classList.add("current-b");
    if (sorted.includes(i)) bar.classList.add("sorted");
  }
}

async function playStep() {
  if (currentIndex >= steps.length) return;
  const step = steps[currentIndex];

  // Render current quick sort step
  renderQuickSortStep(step, true);
  await new Promise((r) => setTimeout(r, 400));

  currentIndex++;
}

async function playStepReverse() {
  if (currentIndex <= 0) return;
  currentIndex--;
  const step = steps[currentIndex];

  renderQuickSortStep(step, true);
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
document.getElementById("nextBtn").addEventListener("click", nextStep);
document.getElementById("prevBtn").addEventListener("click", prevStep);
document.getElementById("autoBtn").addEventListener("click", autoPlay);

// Initial render
if (steps && steps.length > 0) renderQuickSortStep(steps[0], true);
