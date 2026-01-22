package zpt.dsaVis.algorithms.searching;

public class BinarySearchStep {

    private final int[] beforeArray; // snapshot of array
    private final int low;           // current low
    private final int high;          // current high
    private final int mid;           // current mid
    private final boolean found;     // target found at mid?

    public BinarySearchStep(int[] beforeArray, int low, int high, int mid, boolean found) {
        this.beforeArray = beforeArray;
        this.low = low;
        this.high = high;
        this.mid = mid;
        this.found = found;
    }

    public int[] getBeforeArray() { return beforeArray; }
    public int getLow() { return low; }
    public int getHigh() { return high; }
    public int getMid() { return mid; }
    public boolean isFound() { return found; }
}
