package Project.comu.Member.Dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class IdAuthRequestDto {

    @NotEmpty(message = "아이디을 입력해주세요")
    public String Id;
}