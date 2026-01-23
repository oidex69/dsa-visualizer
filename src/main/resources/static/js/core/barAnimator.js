// src/main/resources/static/js/core/barAnimator.js
// Global helper (non-module) for smooth bar animations using CSS transforms.
// This utility manages rendering and updating an array of bars inside a container,
// typically for visualizing algorithms (sorting, searching, etc.).

(function () {
  const BarAnimator = {
    // Reference to the container DOM element (#array-container).
    container: null,

    // Array of bar DOM elements currently rendered.
    bars: [],

    // Default bar width (pixels). Will be recalculated dynamically.
    barW: 28,

    // Horizontal gap between bars (pixels).
    gap: 8,

    // Maximum value in the current array (used for scaling heights).
    maxVal: 1,

    // Flag to track whether initialization has been performed.
    initialized: false,

    /**
     * Ensures we have a reference to the container element.
     * If not already cached, fetches #array-container from the DOM.
     */
    _ensureContainer() {
      if (!this.container) {
        this.container = document.getElementById("array-container");
      }
      return this.container;
    },

    /**
     * Computes layout parameters (bar width) based on container width and number of bars.
     * Ensures bars fit within the container with gaps applied.
     * @param {number} n - Number of bars to render.
     */
    _computeLayout(n) {
      const c = this._ensureContainer();
      if (!c) return;

      // Available width inside container (subtract padding ~24px).
      const innerW = Math.max(200, c.clientWidth - 24);

      // Compute bar width so all bars fit, with minimum width safeguard.
      this.barW = Math.max(10, Math.floor((innerW - this.gap * (n - 1)) / n));

      // Expose bar width as a CSS variable for styling flexibility.
      c.style.setProperty("--barW", `${this.barW}px`);
    },

    /**
     * Computes the pixel height of a bar given its value.
     * Scales relative to maxVal so tallest bar reaches near container height.
     * @param {number} v - Value of the bar.
     * @returns {number} - Height in pixels.
     */
    _heightOf(v) {
      const c = this._ensureContainer();
      // Chart height is container height minus some top margin (50px).
      const chartH = (c ? c.clientHeight : 320) - 50;
      const ratio = this.maxVal ? (v / this.maxVal) : 0;

      // Ensure minimum bar height of 10px, scale proportionally otherwise.
      return Math.max(10, Math.round(ratio * Math.max(120, chartH)));
    },

    /**
     * Initializes the bar chart with an initial array of values.
     * Clears container, computes layout, and renders bars.
     * @param {Array<number>} initialArray - Array of values to visualize.
     */
    init(initialArray) {
      const c = this._ensureContainer();
      if (!c) {
        console.error("BarAnimator: #array-container not found.");
        return;
      }

      // Clear any existing bars.
      c.innerHTML = "";
      this.initialized = true;

      // Defensive copy of input array.
      const arr = Array.isArray(initialArray) ? initialArray.slice() : [];

      // Track maximum value for height scaling.
      this.maxVal = Math.max(...arr, 1);

      // Compute layout based on array length.
      this._computeLayout(arr.length);

      // Create bar elements for each value.
      this.bars = arr.map((v, i) => {
        const el = document.createElement("div");
        el.className = "array-element";
        el.dataset.value = String(v);

        // Optional: display value as text inside bar.
        el.textContent = v;

        // Initial render: set height and horizontal position.
        el.style.height = `${this._heightOf(v)}px`;
        el.style.transform = `translateX(${i * (this.barW + this.gap)}px)`;

        // Append to container.
        c.appendChild(el);
        return el;
      });
    },

    /**
     * Updates bar positions and heights to match a new array order.
     * Uses stable queues to handle duplicate values correctly.
     * @param {Array<number>} nextArray - New array order to animate to.
     */
    moveToArray(nextArray) {
      if (!this.initialized) {
        // If not initialized yet, just initialize with new array.
        this.init(nextArray);
        return;
      }

      const arr = Array.isArray(nextArray) ? nextArray.slice() : [];
      this.maxVal = Math.max(...arr, 1);

      // Recompute layout if array length changed.
      this._computeLayout(arr.length);

      // Build queues keyed by value from current bar order.
      const map = new Map();
      for (const el of this.bars) {
        const key = el.dataset.value;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(el);
      }

      // Construct new bar order by consuming queues.
      const newBars = arr.map((v) => {
        const key = String(v);
        const q = map.get(key);
        return q && q.length ? q.shift() : null;
      });

      // If mismatch occurs (e.g., missing bars), re-init safely.
      if (newBars.some((b) => !b)) {
        this.init(arr);
        return;
      }

      this.bars = newBars;

      // Apply transforms and height updates.
      // CSS transitions (defined in stylesheet) will animate these changes.
      this.bars.forEach((el, i) => {
        const v = arr[i];
        el.dataset.value = String(v);
        el.textContent = v;
        el.style.height = `${this._heightOf(v)}px`;
        el.style.transform = `translateX(${i * (this.barW + this.gap)}px)`;
      });
    },

    /**
     * Clears any state-related CSS classes from bars.
     * Useful before applying new highlights in algorithm visualizations.
     */
    clearStateClasses() {
      for (const el of this.bars) {
        el.classList.remove(
          "current",
          "current-a",
          "current-b",
          "pivot",
          "sorted",
          "current-min",
          "active-range"
        );
        // Reset inline styles used by search highlights.
        el.style.backgroundColor = "";
        el.style.border = "";
      }
    },

    /**
     * Returns the bar DOM element at a given index.
     * @param {number} i - Index in current bar order.
     * @returns {HTMLElement|null} - Bar element or null if out of bounds.
     */
    getBarAtIndex(i) {
      return this.bars[i] || null;
    },
  };

  // Expose globally (since scripts are not ES modules).
  window.BarAnimator = BarAnimator;
})();