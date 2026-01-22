package zpt.dsaVis.algorithms.Sorting;

import zpt.dsaVis.SortingAlgorithm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class QuickSort implements SortingAlgorithm {

    private List<quickSortStep> steps = new ArrayList<>();
    private List<Integer> sortedIndices = new ArrayList<>();

    @Override
    public void implementAlgorithm(int[] arr) {
        steps.clear();
        sortedIndices.clear();

        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted Array: " + Arrays.toString(arr));
    }

    private void quickSort(int[] arr, int low, int high) {

        // Visualize current subarray range
        steps.add(new quickSortStep(
                arr.clone(),
                arr.clone(),
                -1,
                -1,
                -1,
                new ArrayList<>(sortedIndices),
                low,
                high
        ));

        if (low < high) {
            int pi = partition(arr, low, high);

            sortedIndices.add(pi);

            // Pivot finalized
            steps.add(new quickSortStep(
                    arr.clone(),
                    arr.clone(),
                    -1,
                    -1,
                    pi,
                    new ArrayList<>(sortedIndices),
                    low,
                    high
            ));

            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {

            int[] before = arr.clone();

            // Comparison step
            steps.add(new quickSortStep(
                    before,
                    before,
                    j,
                    high,
                    high,
                    new ArrayList<>(sortedIndices),
                    low,
                    high
            ));

            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);

                int[] after = arr.clone();

                // Swap step
                steps.add(new quickSortStep(
                        before,
                        after,
                        i,
                        j,
                        high,
                        new ArrayList<>(sortedIndices),
                        low,
                        high
                ));
            }
        }

        int[] beforePivotSwap = arr.clone();
        swap(arr, i + 1, high);

        // Pivot swap
        steps.add(new quickSortStep(
                beforePivotSwap,
                arr.clone(),
                i + 1,
                high,
                i + 1,
                new ArrayList<>(sortedIndices),
                low,
                high
        ));

        return i + 1;
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    @Override
    public List<quickSortStep> getSteps() {
        return steps;
    }
}
