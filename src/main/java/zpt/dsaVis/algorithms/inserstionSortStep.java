package zpt.dsaVis.algorithms;

import java.util.ArrayList;
import java.util.List;

public class inserstionSortStep {
    private int[] beforeArray;
    private int[] afterArray;
    private int index1 = -1;
    private int index2 = -1;
    private List<Integer> sortedIndices = new ArrayList<>();

    public inserstionSortStep() {}

    public inserstionSortStep(
        int[] beforeArray,
        int[] afterArray,
        int index1,
        int index2,
        List<Integer> sortedIndices
    ) {
        this.beforeArray = beforeArray;
        this.afterArray = afterArray;
        this.index1 = index1;
        this.index2 = index2;
        this.sortedIndices = sortedIndices;
    }

    public int getIndex1() {
        return index1;
    }

    public int getIndex2() {
        return index2;
    }

    public int[] getAfterArray() {
        return afterArray;
    }

    public int[] getBeforeArray() {
        return beforeArray;
    }

    public List<Integer> getSortedIndices() {
        return sortedIndices;
    }

}
