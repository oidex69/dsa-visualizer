package zpt.dsaVis;

import java.util.List;

public interface SearchAlgorithm extends Algorithm {

    void setTarget(int target);
    int getTarget();

    List<?> getSteps();

}