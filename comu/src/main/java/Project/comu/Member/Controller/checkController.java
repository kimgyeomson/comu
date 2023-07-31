package Project.comu.Member.Controller;

import Project.comu.Member.Dto.EmailAvailabilityResponse;
import Project.comu.Member.So.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class checkController {
    @Autowired
    MemberService memberService;

//  axios를 활용한 중복 이메일 확인유무
    @GetMapping("/check-email/{email}")
    public ResponseEntity<EmailAvailabilityResponse> checkEmailAvailability(@PathVariable String email) {
        boolean isUsernameAvailable = memberService.Boolean_findByEmail(email);
        EmailAvailabilityResponse response = new EmailAvailabilityResponse(isUsernameAvailable);
        return ResponseEntity.ok(response);
    }
// axios를 활용한 중복 핸드폰 확인유무
    @GetMapping("/check-phone/{phone}")
    public ResponseEntity<EmailAvailabilityResponse> checkPhoneAvailability(@PathVariable String phone) {
        boolean isUsernameAvailable = memberService.Boolean_findByPhone(phone);
        EmailAvailabilityResponse response = new EmailAvailabilityResponse(isUsernameAvailable);
        return ResponseEntity.ok(response);
    }
}
