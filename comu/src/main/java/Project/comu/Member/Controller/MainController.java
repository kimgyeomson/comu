package Project.comu.Member.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
//  메인 컨트롤러
    @GetMapping("/")
    public String main() {
        return "/content/main";
    }
}
