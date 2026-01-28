package zpt.dsaVis;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AlgoRestController {
    @GetMapping(value = "/algo/{projectKey}", produces = MediaType.APPLICATION_JSON_VALUE)
    public JsonNode getAlgoDetails(@PathVariable String projectKey) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new ClassPathResource("algorithmInfo.json").getInputStream());
        return root.has(projectKey) ? root.get(projectKey) : null;
    }

}