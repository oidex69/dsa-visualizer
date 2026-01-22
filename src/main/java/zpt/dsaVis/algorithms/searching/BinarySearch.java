package zpt.dsaVis.algorithms.searching;

import zpt.dsaVis.SearchAlgorithm;
import java.util.ArrayList;
import java.util.List;

public class BinarySearch implements SearchAlgorithm {

    private List<BinarySearchStep> steps = new ArrayList<>();
    private int target = 5;

    @Override
    public void implementAlgorithm(int[] arr) {
        steps.clear();
        binarySearch(arr, target);
    }

    public void binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            boolean found = arr[mid] == target;

            // Record step
            steps.add(new BinarySearchStep(
                    arr.clone(),
                    low,
                    high,
                    mid,
                    found
            ));

            if (found) {
                return; // target found
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }

    @Override
    public List<BinarySearchStep> getSteps() {
        return steps;
    }

    @Override
    public void setTarget(int target) { this.target = target; }

    @Override
    public int getTarget() { return target; }
//
//    public static void main(String[] args) {
//        int[] arr = {1,2,3,4,5,6,7,8,9};
//        BinarySearch bs = new BinarySearch();
//        bs.setTarget(5);
//        bs.binarySearch(arr, 5);
//        bs.getSteps().forEach(step -> System.out.println("Mid: " + step.getMid()));
//    }
}
