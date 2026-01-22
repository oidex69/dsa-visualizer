package zpt.dsaVis;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import zpt.dsaVis.algorithms.BubbleSort;
import zpt.dsaVis.algorithms.MergeSort;
import zpt.dsaVis.algorithms.SelectionSort;
import zpt.dsaVis.algorithms.insertionSort;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Controller
public class mainController {
    Map<String, List<algorithm>> high;
    Map<String, SortingAlgorithm> objectList;

        mainController() {
            high = Map.of(
                "Sorting", List.of(
                        new algorithm("BubbleSort","/algo/BubbleSort"),
                        new algorithm("QuickSort","/algo/QuickSort"),
                        new algorithm("InsertionSort","/algo/InsertionSort"),
                        new algorithm("SelectionSort","/algo/SelectionSort"),
                        new algorithm("MergeSort","/algo/MergeSort"),
                        new algorithm("RadixSort","/algo/RadixSort")
                ),
                "Searching", List.of(
                        new algorithm("LinearSearch","/algo/LinearSearch"),
                        new algorithm("BinarySearch","/algo/BinarySearch")
                )
            );

            objectList = Map.of(
                    "BubbleSort", new BubbleSort(),
                    "InsertionSort", new insertionSort(),
                    "MergeSort", new MergeSort(),
                    "SelectionSort", new SelectionSort()
            );

        }

    @GetMapping("/")
    public String homePage(Model m) {
        List<data> listOfPeople = new ArrayList<>();
        listOfPeople.add(
                new data("ronak","link","front")
        );
        listOfPeople.add(
                new data("prince","link","back")
        );

        m.addAttribute("text", listOfPeople);
        m.addAttribute("homePageCss","/css/homepage.css");

        return "Homepage";
    }

    @GetMapping("/ronak")
    public String canvas(Model m) {
        m.addAttribute("algorithms", high);
        return "canvas";
    }

    @GetMapping("/algo/{projectKey}")
    public String mainFunction(
            @PathVariable String projectKey,
            Model m
    ) {

        int[] arrayToSort = {5, 3, 8, 4, 2}; // Example array
        SortingAlgorithm sorter = objectList.get(projectKey);
        sorter.sort(arrayToSort);
        m.addAttribute("steps", sorter.getSteps());

        m.addAttribute("title",projectKey);
        Object obj = objectList.get(projectKey);
        m.addAttribute("chosen",obj);
        return "mainFunction";
    }
}
