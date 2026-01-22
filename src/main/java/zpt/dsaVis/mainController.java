package zpt.dsaVis;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import zpt.dsaVis.algorithms.Sorting.*;
import zpt.dsaVis.algorithms.searching.LinearSearch;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;


@Controller
public class mainController {
    Map<String, List<algorithmDetail>> high;
    Map<String, Algorithm> objectList;

        mainController() {
            high = Map.of(
                "Sorting", List.of(
                        new algorithmDetail("BubbleSort","/algo/BubbleSort"),
                        new algorithmDetail("QuickSort","/algo/QuickSort"),
                        new algorithmDetail("InsertionSort","/algo/InsertionSort"),
                        new algorithmDetail("SelectionSort","/algo/SelectionSort"),
                        new algorithmDetail("MergeSort","/algo/MergeSort"),
                        new algorithmDetail("RadixSort","/algo/RadixSort")
                ),
                "Searching", List.of(
                        new algorithmDetail("LinearSearch","/algo/LinearSearch"),
                        new algorithmDetail("BinarySearch","/algo/BinarySearch")
                )
            );

            objectList = Map.of(
                    "BubbleSort", new BubbleSort(),
                    "InsertionSort", new insertionSort(),
                    "MergeSort", new MergeSort(),
                    "QuickSort", new QuickSort(),
                    "SelectionSort", new SelectionSort(),
                    "LinearSearch", new LinearSearch()
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
        Algorithm sorter = objectList.get(projectKey);
        sorter.implementAlgorithm(arrayToSort);
        m.addAttribute("steps", sorter.getSteps());
        Collection<String> arr = new ArrayList<>();
        List<String> arr1;
        m.addAttribute("title",projectKey);
        Object obj = objectList.get(projectKey);
        m.addAttribute("chosen",obj);
        return "mainFunction";

    }
}
