package Project.comu.Member.So;

import Project.comu.Member.Dao.MemberDao;
import Project.comu.Member.Dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberDao memberDao;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public int join(MemberDto member) throws ParseException {
        String encoderPw = passwordEncoder.encode(member.getPassword());
        member.setPassword(encoderPw);
        Date birth = convertToDate(member.getBirthday());
        member.setBirth(birth);

        return memberDao.join(member);
    }

    public Optional<MemberDto> login(MemberDto member) {
        Optional<MemberDto> user = memberDao.findById(member.getId());

        if(user.isPresent()) {
             if(passwordEncoder.matches(member.getPassword(), user.get().getPassword())){
                 return user;
             }
        }
        return user;
    }

    public Optional<MemberDto> findById(MemberDto member) {

        return memberDao.findById(member.getId());
    }

    public boolean Boolean_findById(String Id) {
        return memberDao.Boolean_findById(Id);
    }

    public boolean Boolean_findByPhone(String phone) {
        return memberDao.Boolean_findByPhone(phone);
    }

    public Optional<MemberDto> findByPhone(String phone) {

        return memberDao.findByPhone(phone);
    }

    public boolean NaverLogin(MemberDto member) {
        return memberDao.NaverLogin(member.getId(), member.getPhone());
    }

// String => Date 변환
    public Date convertToDate(String dateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
        return sdf.parse(dateString);
    }
}
