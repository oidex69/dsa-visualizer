package zpt.dsaVis.algorithms.Sorting;

import java.util.List;

public class mergeSortStep {
    private int[] afterArray;
    private int leftStart, leftEnd, rightStart, rightEnd;
    private int comparingIndexLeft = -1;
    private int comparingIndexRight = -1;
    private List<Integer> sortedIndices;  // NEW: tracks finalized indices

    public mergeSortStep(int[] afterArray,
                         int leftStart, int leftEnd,
                         int rightStart, int rightEnd,
                         int comparingIndexLeft, int comparingIndexRight,
                         List<Integer> sortedIndices) {
        this.afterArray = afterArray;
        this.leftStart = leftStart;
        this.leftEnd = leftEnd;
        this.rightStart = rightStart;
        this.rightEnd = rightEnd;
        this.comparingIndexLeft = comparingIndexLeft;
        this.comparingIndexRight = comparingIndexRight;
        this.sortedIndices = sortedIndices;
    }

    public int[] getAfterArray() { return afterArray; }
    public int getLeftStart() { return leftStart; }
    public int getLeftEnd() { return leftEnd; }
    public int getRightStart() { return rightStart; }
    public int getRightEnd() { return rightEnd; }
    public int getComparingIndexLeft() { return comparingIndexLeft; }
    public int getComparingIndexRight() { return comparingIndexRight; }
    public List<Integer> getSortedIndices() { return sortedIndices; }
}
