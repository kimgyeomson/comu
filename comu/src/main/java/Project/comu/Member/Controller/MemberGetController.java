package Project.comu.Member.Controller;

import Project.comu.Member.So.MemberService;
import Project.comu.Member.Dto.MemberDto;
import Project.comu.Oauth.Naver.NaverLoginBO;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

@Log4j2
@Controller
@RequiredArgsConstructor
public class MemberGetController {


    private final MemberService memberService;
    private final NaverLoginBO naverLoginBO;

    @GetMapping("/login")
    public String login(Model model, HttpSession session) {
        /* 네이버아이디로 인증 URL을 생성하기 위하여 naverLoginBO클래스의 getAuthorizationUrl메소드 호출 */
        String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
        //네이버
        model.addAttribute("url", naverAuthUrl);
        /* 생성한 인증 URL을 View로 전달 */
        return "/content/login";
    }

//  회원가입
    @GetMapping("/join")
    public String join() {
        return "/content/join";
    }
// 주소 팝업창
    @GetMapping("/address-search")
    public String addressSearch(){
        return "/content/addressSearch";
    }

    @GetMapping("/naver")
    public String naverForm() {
        return "content/naverForm";
    }

    @GetMapping("/find")
    public String find() {
        return "content/find";
    }

    @GetMapping("/findEmail")
    public String findEmail() {
        return "content/findEmail";
    }

    @GetMapping("/findPassword")
    public String findPassword() {
        return "content/findPassword";
    }






}
