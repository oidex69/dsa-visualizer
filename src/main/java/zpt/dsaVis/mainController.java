package zpt.dsaVis;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.RestController;
import zpt.dsaVis.algorithms.Sorting.*;
import zpt.dsaVis.algorithms.searching.BinarySearch;
import zpt.dsaVis.algorithms.searching.LinearSearch;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class mainController {
    Map<String, List<AlgorithmDetails>> high;
    Map<String, Algorithm> objectList;

        mainController() {
            high = Map.of(
                "Sorting", List.of(
                        new AlgorithmDetails("BubbleSort","/algo/BubbleSort"),
                        new AlgorithmDetails("QuickSort","/algo/QuickSort"),
                        new AlgorithmDetails("InsertionSort","/algo/InsertionSort"),
                        new AlgorithmDetails("SelectionSort","/algo/SelectionSort"),
                        new AlgorithmDetails("MergeSort","/algo/MergeSort"),
                        new AlgorithmDetails("RadixSort","/algo/RadixSort")
                ),
                "Searching", List.of(
                        new AlgorithmDetails("LinearSearch","/algo/LinearSearch"),
                        new AlgorithmDetails("BinarySearch","/algo/BinarySearch")
                )
            );

            objectList = Map.of(
                    "BubbleSort", new BubbleSort(),
                    "InsertionSort", new insertionSort(),
                    "MergeSort", new MergeSort(),
                    "QuickSort", new QuickSort(),
                    "SelectionSort", new SelectionSort(),
                    "LinearSearch", new LinearSearch(),
                    "BinarySearch", new BinarySearch()
            );

        }

    @GetMapping("/homepage")
    public String homePage(Model m) {
        // List<data> listOfPeople = new ArrayList<>();
        // listOfPeople.add(
        //         new data("ronak","link","front")
        // );
        // listOfPeople.add(
        //         new data("prince","link","back")
        // );

        // m.addAttribute("text", listOfPeople);
        m.addAttribute("homePageCss","/css/homepage.css"); 
        return "Homepage";
    }

    @GetMapping("/canvas")
    public String canvas(
    @RequestParam(value = "type", required = false) String type,Model m) 
    {
        Map<String, List<AlgorithmDetails>> filteredAlgorithms;
        
        if (type != null) {
            String normalizedType = type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase();
            filteredAlgorithms = high.containsKey(normalizedType) 
                ? Map.of(normalizedType, high.get(normalizedType))
                : high;
        } else {
            filteredAlgorithms = high;
        }
    
        m.addAttribute("algorithms", filteredAlgorithms);
        m.addAttribute("headerFooterCss","/css/headerFooter.css");
        m.addAttribute("infoDivCss","/css/infoDiv.css");
        return "canvas";
    }

    @GetMapping("/about")
    public String about(Model m) {
    m.addAttribute("aboutCss","/css/about.css");
    return "about";
}

    // @GetMapping("/about")
    // public String aboutPage(Model m) {
    //     m.addAttribute("homePageCss","/css/homepage.css");
    //     return "About";
    // }

    @GetMapping("/algo/{projectKey}")
    public String mainFunction(
            @PathVariable String projectKey,
            Model m
    ) {
//        int[] arrayToSort = {1,2,3,4,5,6,7}; // Example array
        int[] arrayToSort = {5,2,8,1,2,3,5}; // Example array
        Algorithm sorter = objectList.get(projectKey);
        if(sorter instanceof SearchAlgorithm)
            ((SearchAlgorithm) sorter).setTarget(8  );
        sorter.implementAlgorithm(arrayToSort);

        m.addAttribute("steps", sorter.getSteps());
        m.addAttribute("title",projectKey);
        return "mainFunction";

    }
}
