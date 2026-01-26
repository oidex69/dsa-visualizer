// src/main/resources/static/js/core/barAnimator.js
(function () {
  const BarAnimator = {
    container: null,
    bars: [],
    barW: 18,
    gap: 8,
    maxVal: 1,
    initialized: false,

    _ensureContainer() {
      if (!this.container) {
        this.container = document.getElementById("array-container");
      }
      return this.container;
    },

    _computeLayout(n) {
      const c = this._ensureContainer();
      if (!c) return;

      const innerW = Math.max(200, c.clientWidth - 24);
      this.barW = Math.max(10, Math.floor((innerW - this.gap * (n - 1)) / n));
      c.style.setProperty("--barW", `${this.barW}px`);
    },

    _heightOf(v) {
      const c = this._ensureContainer();
      const chartH = (c ? c.clientHeight : 320) - 50;
      const ratio = this.maxVal ? v / this.maxVal : 0;
      return Math.max(10, Math.round(ratio * Math.max(120, chartH)));
    },

    /**
     * Initialize bars. Now accepts a target value to place the target bubble.
     * @param {Array<number>} initialArray
     * @param {number} target
     */
    init(initialArray, target) {
      const c = this._ensureContainer();
      if (!c) return;

      c.innerHTML = "";
      this.initialized = true;

      const arr = Array.isArray(initialArray) ? initialArray.slice() : [];
      this.maxVal = Math.max(...arr, 1);
      this._computeLayout(arr.length);

      // Find the index of the target (first occurrence)
      const targetIndex = arr.indexOf(target);

      this.bars = arr.map((v, i) => {
        const el = document.createElement("div");
        el.className = "array-element";
        el.dataset.value = String(v);
        el.textContent = v;

        el.style.height = `${this._heightOf(v)}px`;
        el.style.transform = `translateX(${i * (this.barW + this.gap)}px)`;

        // Add target bubble only at the correct index
        if (i === targetIndex) {
          const marker = document.createElement("div");
          marker.textContent = "Target";
          marker.className = "target-marker"; // empty bubble
          marker.style.position = "absolute";
          marker.style.top = "-28px";
          marker.style.left = "50%";
          marker.style.transform = "translateX(-50%)";
          el.appendChild(marker);
        }

        c.appendChild(el);
        return el;
      });
    },

    moveToArray(nextArray) {
      if (!this.initialized) {
        this.init(nextArray);
        return;
      }

      const arr = Array.isArray(nextArray) ? nextArray.slice() : [];
      this.maxVal = Math.max(...arr, 1);
      this._computeLayout(arr.length);

      const map = new Map();
      for (const el of this.bars) {
        const key = el.dataset.value;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(el);
      }

      const newBars = arr.map((v) => {
        const key = String(v);
        const q = map.get(key);
        return q && q.length ? q.shift() : null;
      });

      if (newBars.some((b) => !b)) {
        this.init(arr);
        return;
      }

      this.bars = newBars;

      this.bars.forEach((el, i) => {
        const v = arr[i];
        el.dataset.value = String(v);
        el.textContent = v;
        el.style.height = `${this._heightOf(v)}px`;
        el.style.transform = `translateX(${i * (this.barW + this.gap)}px)`;
      });
    },

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
        el.style.backgroundColor = "";
        el.style.border = "";
      }
    },

    getBarAtIndex(i) {
      return this.bars[i] || null;
    },
  };

  window.BarAnimator = BarAnimator;
})();
