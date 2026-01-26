// /js/binarySearch.js
(function () {
  let currentIndex = 0;
  let interval = null;
  let barInitDone = false;
  let cachedTarget = null; // 🔥 FIX: store target once

  function renderBinarySearchStep(step) {
    const arr = step.beforeArray || step.array || step.arr || [];

    // 🔥 FIX: capture target if present
    if (step.target !== undefined && cachedTarget === null) {
      cachedTarget = step.target;
      console.log(step.target)
    }

    // Initialize bars ONCE with a VALID target
    if (!barInitDone) {
      BarAnimator.init(arr, cachedTarget);
      barInitDone = true;
    }

    // Clear only visual state (NOT target marker)
    BarAnimator.clearStateClasses();

    const low = typeof step.low === "number" ? step.low : null;
    const high = typeof step.high === "number" ? step.high : null;
    const mid = typeof step.mid === "number" ? step.mid : null;

    for (let i = 0; i < arr.length; i++) {
      const bar = BarAnimator.getBarAtIndex(i);
      if (!bar) continue;

      bar.style.backgroundColor = "";
      bar.style.border = "";

      // outside active range
      if (low !== null && high !== null && (i < low || i > high)) {
        bar.style.backgroundColor = "#ccc";
      }

      if (i === low) {
        bar.style.border = "2px solid blue";
        bar.style.backgroundColor = "blue";
      }

      if (i === high) {
        bar.style.border = "2px solid red";
        bar.style.backgroundColor = "red";
      }

      if (i === mid) {
        let color = "#ff9800"; // orange

        if (step.found === true || step.isFound === true) {
          color = "#4caf50";
          bar.classList.add("sorted");
        } else {
          bar.classList.add("current");
        }

        bar.style.border = `2px solid ${color}`;
        bar.style.backgroundColor = color;
      }
    }
  }

  // STEP CONTROLS
  async function playStep() {
    if (!Array.isArray(steps) || currentIndex >= steps.length) return;
    renderBinarySearchStep(steps[currentIndex]);
    currentIndex++;
    await new Promise((r) => setTimeout(r, 700));
  }

  async function playStepReverse() {
    if (!Array.isArray(steps) || currentIndex <= 0) return;
    currentIndex--;
    renderBinarySearchStep(steps[currentIndex]);
    await new Promise((r) => setTimeout(r, 700));
  }

  function nextStep() {
    if (interval) return;
    playStep();
  }

  function prevStep() {
    if (interval) return;
    playStepReverse();
  }

  async function autoPlay() {
    const autoBtn = document.getElementById("autoBtn");
    if (!autoBtn) return;

    if (interval) {
      clearInterval(interval);
      interval = null;
      autoBtn.textContent = "Auto";
      return;
    }

    autoBtn.textContent = "Stop";
    interval = setInterval(async () => {
      if (!Array.isArray(steps) || currentIndex >= steps.length) {
        clearInterval(interval);
        interval = null;
        autoBtn.textContent = "Auto";
        return;
      }
      await playStep();
    }, 900);
  }

  // Button bindings
  document.getElementById("nextBtn")?.addEventListener("click", nextStep);
  document.getElementById("prevBtn")?.addEventListener("click", prevStep);
  document.getElementById("autoBtn")?.addEventListener("click", autoPlay);

  // Initial render
  if (Array.isArray(steps) && steps.length > 0) {
    currentIndex = 0;
    renderBinarySearchStep(steps[0]);
    currentIndex = 1;
  }
})();
