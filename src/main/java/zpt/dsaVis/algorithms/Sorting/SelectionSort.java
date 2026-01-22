package zpt.dsaVis.algorithms.Sorting;

import zpt.dsaVis.SortingAlgorithm;
import java.util.ArrayList;
import java.util.List;

public class SelectionSort implements SortingAlgorithm {

    private List<selectionSortStep> step = new ArrayList<>();

    @Override
    public void implementAlgorithm(int[] arr) {
        step.clear();
        List<Integer> sortedIndices = new ArrayList<>();

        for (int current = 0; current < arr.length; current++) {
            int smallestIndex = current;

            for (int i = current + 1; i < arr.length; i++) {
                int[] before = arr.clone();

                // Check and update smallestIndex first
                if (arr[i] < arr[smallestIndex]) {
                    smallestIndex = i;
                }

                // Add single step showing comparison and current min
                step.add(new selectionSortStep(
                        before,
                        arr.clone(),
                        current,        // current index
                        i,              // comparing
                        smallestIndex,  // highlight current min
                        new ArrayList<>(sortedIndices)
                ));
            }

            // Swap after scanning
            if (smallestIndex != current) {
                int temp = arr[current];
                arr[current] = arr[smallestIndex];
                arr[smallestIndex] = temp;
            }

            sortedIndices.add(current);
            step.add(new selectionSortStep(
                    arr.clone(),
                    arr.clone(),
                    current,
                    smallestIndex,
                    -1, // no dynamic min highlight during swap if you want
                    new ArrayList<>(sortedIndices)
            ));
        }
    }

    @Override
    public List<selectionSortStep> getSteps() {
        return step;
    }

//    public static void main(String[] args) {
//        int[] arr = {5, 3, 8, 4, 2};
//        SelectionSort sorter = new SelectionSort();
//        sorter.sort(arr);
//
//        // Display only after arrays
//        for (selectionSortStep s : sorter.getSteps()) {
//            System.out.println(Arrays.toString(s.getAfterArray()));
//        }
//    }
}
