package zpt.dsaVis.algorithms.Sorting;

import zpt.dsaVis.SortingAlgorithm;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MergeSort implements SortingAlgorithm {

    private List<mergeSortStep> step = new ArrayList<>();
    private List<Integer> finalized = new ArrayList<>(); // Tracks fully merged indices

    @Override
    public void implementAlgorithm(int[] arr) {
        step.clear();
        finalized.clear();
        mergeSort(arr, 0, arr.length - 1);
    }

    private void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);       // Sort left half
            mergeSort(arr, m + 1, r);   // Sort right half
            merge(arr, l, m, r);        // Merge both halves

            // After merging this section, mark indices as finalized
            for (int idx = l; idx <= r; idx++) {
                if (!finalized.contains(idx)) finalized.add(idx);
            }
        }
    }

    private void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] left = new int[n1];
        int[] right = new int[n2];
        System.arraycopy(arr, l, left, 0, n1);
        System.arraycopy(arr, m + 1, right, 0, n2);

        int i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            // Record step BEFORE insertion
            step.add(new mergeSortStep(
                    arr.clone(),
                    l, m,
                    m + 1, r,
                    l + i,
                    m + 1 + j,
                    new ArrayList<>(finalized)
            ));

            // Merge
            if (left[i] <= right[j]) {
                arr[k] = left[i++];
            } else {
                arr[k] = right[j++];
            }

            // Record step AFTER insertion
            step.add(new mergeSortStep(
                    arr.clone(),
                    l, m,
                    m + 1, r,
                    l + i - 1 >= l ? l + i - 1 : -1,
                    m + 1 + j - 1 >= m + 1 ? m + 1 + j - 1 : -1,
                    new ArrayList<>(finalized)
            ));
            k++;
        }

        // Copy remaining elements from left
        while (i < n1) {
            arr[k] = left[i++];
            step.add(new mergeSortStep(
                    arr.clone(),
                    l, m,
                    m + 1, r,
                    k, -1,
                    new ArrayList<>(finalized)
            ));
            k++;
        }

        // Copy remaining elements from right
        while (j < n2) {
            arr[k] = right[j++];
            step.add(new mergeSortStep(
                    arr.clone(),
                    l, m,
                    m + 1, r,
                    -1, k,
                    new ArrayList<>(finalized)
            ));
            k++;
        }
    }

    @Override
    public List<mergeSortStep> getSteps() {
        return step;
    }

//    // Test main
//    public static void main(String[] args) {
//        int[] arr = {5, 3, 8, 4, 2};
//        MergeSort sorter = new MergeSort();
//        sorter.sort(arr);
//
//        int count = 1;
//        for (mergeSortStep s : sorter.getSteps()) {
//            System.out.println("Step " + (count++) + ": " + Arrays.toString(s.getAfterArray())
//                    + " Sorted indices: " + s.getSortedIndices());
//        }
//    }
}
