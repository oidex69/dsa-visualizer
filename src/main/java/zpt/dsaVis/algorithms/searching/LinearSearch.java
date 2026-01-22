package zpt.dsaVis.algorithms.searching;

import zpt.dsaVis.SearchAlgorithm;
import java.util.ArrayList;
import java.util.List;

public class LinearSearch implements SearchAlgorithm {

    private List<linearSearchStep> steps = new ArrayList<>();
    private int target = 8;

    @Override
    public void implementAlgorithm(int[] arr) {
        steps.clear();

        int[] checkedIndicesArray = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            int[] before = arr.clone();

            // Fill checked indices up to current index
            for (int j = 0; j <= i; j++) {
                checkedIndicesArray[j] = j;
            }

            boolean found = arr[i] == target;

            // Add step
            steps.add(new linearSearchStep(
                    before,
                    i,
                    checkedIndicesArray.clone(), // clone to freeze state
                    found
            ));

            if (found) break;
        }
    }

    @Override
    public List<linearSearchStep> getSteps() {
        return steps;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public int getTarget() {
        return target;
    }
}
