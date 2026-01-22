package zpt.dsaVis.algorithms.Sorting;

import zpt.dsaVis.SortingAlgorithm;

import java.util.ArrayList;
import java.util.List;

public class BubbleSort implements SortingAlgorithm {

    private List<sortStep> steps = new ArrayList<>();

    @Override
    public void implementAlgorithm(int[] arr) {
        steps.clear(); // important if reused

        int n = arr.length;
        List<Integer> sortedIndices = new ArrayList<>();

        for (int i = 0; i < n - 1; i++) {

            for (int j = 0; j < n - i - 1; j++) {

                int[] before = arr.clone();

                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }

                int[] after = arr.clone();

                steps.add(new sortStep(
                        before,
                        after,
                        j,
                        j + 1,
                        new ArrayList<>(sortedIndices)
                ));
            }

            sortedIndices.add(n - i - 1);

            steps.add(new sortStep(
                    arr.clone(),
                    arr.clone(),
                    -1,
                    -1,
                    new ArrayList<>(sortedIndices)
            ));
        }

        sortedIndices.add(0);
        steps.add(new sortStep(
                arr.clone(),
                arr.clone(),
                -1,
                -1,
                new ArrayList<>(sortedIndices)
        ));
    }

    @Override
    public List<sortStep> getSteps() {
        return steps;
    }
}
