package Project.comu.Member.Controller;

import Project.comu.Member.So.MemberService;
import Project.comu.Member.Dto.MemberDto;
import Project.comu.Oauth.Naver.NaverLoginBO;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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
public class MemberController {

    @Autowired
    MemberService memberService;
    @Autowired
    private NaverLoginBO naverLoginBO;


    @GetMapping("/login")
    public String login(Model model, HttpSession session) {
        /* 네이버아이디로 인증 URL을 생성하기 위하여 naverLoginBO클래스의 getAuthorizationUrl메소드 호출 */
        String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
        //네이버
        model.addAttribute("url", naverAuthUrl);
        /* 생성한 인증 URL을 View로 전달 */
        return "/content/login";
    }
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
    public String callback(Model model, @RequestParam String code, @RequestParam String state, HttpSession session
            , HttpServletRequest request)
            throws IOException {
        System.out.println("여기는 callback");
        OAuth2AccessToken oauthToken;
        oauthToken = naverLoginBO.getAccessToken(session, code, state);
        //로그인 사용자 정보를 읽어온다.
//        apiResult = naverLoginBO.getUserProfile(oauthToken);
//        model.addAttribute("result", naverLoginBO.getUserProfile(oauthToken));
        MemberDto user = naverLoginBO.getUserProfile(oauthToken);
        Optional<MemberDto> user2 = memberService.findByEmail(user);

        if(user2.isEmpty()) {
            model.addAttribute("user", user);
            return "/content/Naverjoin";
        }
        session.setAttribute("user", user2.get());
        System.out.println("세션 값 : " + session.getAttribute("user"));
        return "redirect:/";
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

    @GetMapping("/findEmailResult")
    public String findEmailResult() {
        return "content/findEmailResult";
    }

    @PostMapping("/findEmail")
    public String findEmail_P(MemberDto member, Model model) {


        model.addAttribute("member", memberService.findByPhone(member.getPhone()));

        return "content/findEmailResult";
    }




}
