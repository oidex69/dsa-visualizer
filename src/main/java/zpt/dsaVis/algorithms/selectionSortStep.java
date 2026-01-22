package zpt.dsaVis.algorithms;

import java.util.ArrayList;
import java.util.List;

public class selectionSortStep {
    private int[] beforeArray;
    private int[] afterArray;
    private int index1 = -1;       // comparison index 1
    private int index2 = -1;       // comparison index 2
    private int currentMinIndex = -1; // currently smallest found
    private List<Integer> sortedIndices = new ArrayList<>();

    public selectionSortStep() {}

    public selectionSortStep(int[] beforeArray, int[] afterArray,
                             int index1, int index2,
                             int currentMinIndex,
                             List<Integer> sortedIndices) {
        this.beforeArray = beforeArray;
        this.afterArray = afterArray;
        this.index1 = index1;
        this.index2 = index2;
        this.currentMinIndex = currentMinIndex;
        this.sortedIndices = sortedIndices;
    }

    // getters
    public int[] getBeforeArray() { return beforeArray; }
    public int[] getAfterArray() { return afterArray; }
    public int getIndex1() { return index1; }
    public int getIndex2() { return index2; }
    public int getCurrentMinIndex() { return currentMinIndex; }
    public List<Integer> getSortedIndices() { return sortedIndices; }
}

