package zpt.dsaVis.algorithms;

import java.util.ArrayList;
import java.util.List;

public class bubbleSortStep {

    private int[] beforeArray;         // Array state before swap
    private int[] afterArray;          // Array state after swap
    private int index1 = -1;           // First element being compared
    private int index2 = -1;           // Second element being compared
    private List<Integer> sortedIndices = new ArrayList<>(); // Elements in final position

    // Constructors
    public bubbleSortStep() {}

    public bubbleSortStep(
            int[] beforeArray,
            int[] afterArray,
            int index1,
            int index2,
            List<Integer> sortedIndices
    ) {
        this.beforeArray = beforeArray.clone();
        this.afterArray = afterArray.clone();
        this.index1 = index1;
        this.index2 = index2;
        this.sortedIndices = new ArrayList<>(sortedIndices);
    }

    // Getters & setters
    public int[] getBeforeArray() {
        return beforeArray;
    }

    public void setBeforeArray(int[] beforeArray) {
        this.beforeArray = beforeArray.clone();
    }

    public int[] getAfterArray() {
        return afterArray;
    }

    public void setAfterArray(int[] afterArray) {
        this.afterArray = afterArray.clone();
    }

    public int getIndex1() {
        return index1;
    }

    public void setIndex1(int index1) {
        this.index1 = index1;
    }

    public int getIndex2() {
        return index2;
    }

    public void setIndex2(int index2) {
        this.index2 = index2;
    }

    public List<Integer> getSortedIndices() {
        return sortedIndices;
    }

    public void setSortedIndices(List<Integer> sortedIndices) {
        this.sortedIndices = new ArrayList<>(sortedIndices);
    }

}
