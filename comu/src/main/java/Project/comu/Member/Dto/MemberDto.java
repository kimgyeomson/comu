package Project.comu.Member.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {

    private int Id_seq;
    private String Id;
    private String password;
    private String phone;
    private String name;
    private String birthday;
    private String birthyear;
    private String address;
    private String gender;
    private String foreigner;
    private Date birth;


}
