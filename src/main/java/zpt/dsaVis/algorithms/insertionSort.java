package zpt.dsaVis.algorithms;

import zpt.dsaVis.SortingAlgorithm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class insertionSort implements SortingAlgorithm {

    private List<sortStep> steps = new ArrayList<>();

    public insertionSort() {}

    @Override
    public List<sortStep> getSteps() {
        return steps;
    }

    void display() {
        for (sortStep step : steps) {
            System.out.println(Arrays.toString(step.getAfterArray()));
        }
    }

    @Override
    public void sort(int[] arr) {
        List<Integer> sortedIndices = new ArrayList<>();
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            // Mark previous part as sorted
            sortedIndices.add(i - 1);
            while (j >= 0 && arr[j] > key) {
                int[] before = arr.clone();
                arr[j + 1] = arr[j];
                int[] after = arr.clone();
                steps.add(new sortStep(
                        before,
                        after,
                        j,
                        j + 1,
                        new ArrayList<>(sortedIndices)
                ));
                j--;
            }
            int[] beforeInsert = arr.clone();
            arr[j + 1] = key;
            int[] afterInsert = arr.clone();
            steps.add(new sortStep(
                    beforeInsert,
                    afterInsert,
                    j + 1,
                    i,
                    new ArrayList<>(sortedIndices)
            ));
        }
        // Entire array is now sorted
        sortedIndices.add(arr.length - 1);
        steps.add(new sortStep(
                arr.clone(),
                arr.clone(),
                -1,
                -1,
                new ArrayList<>(sortedIndices)
        ));
        display();
    }

}

