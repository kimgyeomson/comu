package Project.comu.Member.Controller;

import Project.comu.Member.Dto.IdAvailabilityResponse;
import Project.comu.Member.So.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class checkController {
    private final MemberService memberService;

    //  axios를 활용한 중복 아이디 확인유무
    @GetMapping("/check-Id/{Id}")
    public ResponseEntity<IdAvailabilityResponse> checkIdAvailability(@PathVariable String Id) {
        boolean isUsernameAvailable = memberService.Boolean_findById(Id);
        IdAvailabilityResponse response = new IdAvailabilityResponse(isUsernameAvailable);
        return ResponseEntity.ok(response);
    }
// axios를 활용한 중복 핸드폰 확인유무
    @GetMapping("/check-phone/{phone}")
    public ResponseEntity<IdAvailabilityResponse> checkPhoneAvailability(@PathVariable String phone) {
        boolean isUsernameAvailable = memberService.Boolean_findByPhone(phone);
        IdAvailabilityResponse response = new IdAvailabilityResponse(isUsernameAvailable);
        return ResponseEntity.ok(response);
    }
}
