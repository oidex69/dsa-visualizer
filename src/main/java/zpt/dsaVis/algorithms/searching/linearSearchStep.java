package zpt.dsaVis.algorithms.searching;

public class linearSearchStep {

    private final int[] beforeArray;      // snapshot of array
    private final int currentIndex;       // currently comparing index
    private final int[] checkedIndices;   // checked indices as int[]
    private final boolean found;          // whether target found

    public linearSearchStep(int[] beforeArray, int currentIndex, int[] checkedIndices, boolean found) {
        this.beforeArray = beforeArray;
        this.currentIndex = currentIndex;
        this.checkedIndices = checkedIndices;
        this.found = found;
    }

    public int[] getBeforeArray() {
        return beforeArray;
    }

    public int getCurrentIndex() {
        return currentIndex;
    }

    public int[] getCheckedIndices() {
        return checkedIndices;
    }

    public boolean isFound() {
        return found;
    }
}
