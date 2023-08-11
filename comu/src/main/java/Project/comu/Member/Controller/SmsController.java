package Project.comu.Member.Controller;

import Project.comu.Member.Dto.msgDto.MessageDto;
import Project.comu.Member.So.SmsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class SmsController {

    private final SmsService smsService;

    @GetMapping("/send")
    public int getSmsPage(@RequestParam("phoneNumber") String phoneNumber) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        System.out.println("send : " + phoneNumber);

        return smsService.randomNumber();
//        return smsService.sendSms(phoneNumber);
    }

}
