package Project.comu.Member.Controller;

import Project.comu.Member.Dto.MemberDto;
import Project.comu.Member.So.MemberService;
import Project.comu.Oauth.Naver.NaverLoginBO;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class MemberPostController {

    private final MemberService memberService;
    private final NaverLoginBO naverLoginBO;

    // 일반 회원 로그인
    @PostMapping("/login")
    public String login2(MemberDto member, BindingResult bindingResult, HttpServletRequest request) {

        System.out.println("Controller : "+member.toString());
        if (bindingResult.hasErrors()) {
            return "/content/login";
        }

        Optional<MemberDto> loginUser = memberService.login(member);

        if(!loginUser.isPresent()) {
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
            return "/content/login";
        }

        HttpSession session = request.getSession();
        session.setAttribute("user", loginUser.get());
        System.out.println("session.get : loginid : " + session.getAttribute("user"));
        return "redirect:/";
    }
    // 네이버 로그인후 회원가입이 안되어있으면 회원가입 또는 로그인
    @RequestMapping(value = "/callback", method = { RequestMethod.GET, RequestMethod.POST })
    public String callback(Model model, @RequestParam String code, @RequestParam String state,
                           HttpSession session, HttpServletRequest request) throws IOException {
        System.out.println("여기는 callback");
        OAuth2AccessToken oauthToken;
        oauthToken = naverLoginBO.getAccessToken(session, code, state);
        //로그인 사용자 정보를 읽어온다.
//        apiResult = naverLoginBO.getUserProfile(oauthToken);
//        model.addAttribute("result", naverLoginBO.getUserProfile(oauthToken));
        MemberDto user = naverLoginBO.getUserProfile(oauthToken);
        boolean member = memberService.NaverLogin(user);
        boolean memberPhone = memberService.Boolean_findByPhone(user.getPhone());
        if(member) {
            session.setAttribute("user", user.getId());
            System.out.println("세션 값 : " + session.getAttribute("user"));
            return "redirect:/";
        }
        else if(!memberPhone) {
            model.addAttribute("DupPhone", 1);
            return "/content/login";
        }
        else {
            model.addAttribute("user", user);
            return "/content/Naverjoin";
        }
        /* 네이버 로그인 성공 페이지 View 호출 */
    }

    //  로그아웃
    @PostMapping("/logout")
    public String logoutV3(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }
    // 아이디찾기
    @PostMapping("/findId")
    public String findId(MemberDto member, Model model) {
        Optional<MemberDto> memberDto = memberService.findByPhone(member.getPhone());

        memberDto.ifPresent(dto -> model.addAttribute("member", dto));
        System.out.println(memberDto.get().toString());


        return "content/findIdResult";
    }

}
