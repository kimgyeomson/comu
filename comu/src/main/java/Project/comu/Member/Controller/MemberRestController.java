package Project.comu.Member.Controller;

import Project.comu.Member.Dto.MemberDto;
import Project.comu.Member.So.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
public class MemberRestController {

    private final MemberService memberService;

    //  회원가입 처리
    @PostMapping("/findEmail")
    public int join1(MemberDto member) throws ParseException {
        return memberService.join(member);
    }
    // 아이디 찾기



}
