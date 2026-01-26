package zpt.dsaVis.algorithms.searching;

public class linearSearchStep {

    private final int[] beforeArray;      // snapshot of array
    private final int currentIndex;       // currently comparing index
    private final int[] checkedIndices;   // checked indices as int[]
    private final boolean found;          // whether target found
    private int target = -1;

    public linearSearchStep(int[] beforeArray, int currentIndex, int[] checkedIndices, boolean found,int target) {
        this.beforeArray = beforeArray;
        this.currentIndex = currentIndex;
        this.checkedIndices = checkedIndices;
        this.found = found;
        this.target = target;
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

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }
}
