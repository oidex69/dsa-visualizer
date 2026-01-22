package zpt.dsaVis.algorithms.Sorting;

import java.util.List;

public class quickSortStep {

    // Array state
    private final int[] beforeArray;
    private final int[] afterArray;

    // Indices involved in this step
    private final int indexA;      // e.g. i or j
    private final int indexB;      // e.g. j or pivot swap index

    // Pivot index (important for visualization)
    private final int pivotIndex;

    // Finalized indices (already sorted)
    private final List<Integer> sortedIndices;

    // Active subarray range (for partition visualization)
    private final int low;
    private final int high;

    public quickSortStep(
            int[] beforeArray,
            int[] afterArray,
            int indexA,
            int indexB,
            int pivotIndex,
            List<Integer> sortedIndices,
            int low,
            int high
    ) {
        this.beforeArray = beforeArray;
        this.afterArray = afterArray;
        this.indexA = indexA;
        this.indexB = indexB;
        this.pivotIndex = pivotIndex;
        this.sortedIndices = sortedIndices;
        this.low = low;
        this.high = high;
    }

    // Getters (important for renderer)

    public int[] getBeforeArray() {
        return beforeArray;
    }

    public int[] getAfterArray() {
        return afterArray;
    }

    public int getIndexA() {
        return indexA;
    }

    public int getIndexB() {
        return indexB;
    }

    public int getPivotIndex() {
        return pivotIndex;
    }

    public List<Integer> getSortedIndices() {
        return sortedIndices;
    }

    public int getLow() {
        return low;
    }

    public int getHigh() {
        return high;
    }
}
