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
public class SmsController {

    @Autowired
    private SmsService smsService;

    @GetMapping("/send")
    public int getSmsPage(@RequestParam("phoneNumber") String phoneNumber) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
//        System.out.println("send : " + phoneNumber);
//        int random = smsService.sendSms(phoneNumber);


        return smsService.randomNumber();
    }


//    @PostMapping("/sms/send/phone")
//    public String sendSms(MessageDto messageDto, Model model) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
//
////        model.addAttribute("random", smsService.sendSms(messageDto));
//        return "content/result";
//    }
}
