package Project.comu.Member.Dao;


import Project.comu.Member.Dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberDao {

    private final JdbcTemplate jdbcTemplate;

    public int join(MemberDto member) {
        String sql = "INSERT INTO MEMBER VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
            int result = 0;
        try {
            result = jdbcTemplate.update(sql,
                    member.getId(),
                    member.getPassword(),
                    member.getPhone(),
                    member.getName(),
                    member.getBirth(),
                    member.getAddress(),
                    member.getGender(),
                    member.getForeigner());

            return result;
        }
        catch (DuplicateKeyException e) {
            return result;
        }
    }

// 아이디 찾기
    public Optional<MemberDto> findById(String Id) {
        String sql = "SELECT * FROM MEMBER WHERE Id = ?";
        try {
            MemberDto member = jdbcTemplate.queryForObject(sql, new MemberRowMapper(), Id);
            return Optional.ofNullable(member);
        }
        catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
// 아이디 찾기 boolean
    public boolean Boolean_findById(String Id) {
        String sql = "SELECT * FROM MEMBER WHERE Id = ?";
        boolean result = false;
        try {
            MemberDto answer = jdbcTemplate.queryForObject(sql, new MemberRowMapper(), Id);
            if(answer != null) {
                return result;
            }
        }
        catch (EmptyResultDataAccessException e) {
            result = true;
        }
        return result;
    }

    public boolean Boolean_findByPhone(String phone) {
        String sql = "SELECT * FROM MEMBER WHERE PHONE = ?";
        boolean result = false;
        try {
            MemberDto answer = jdbcTemplate.queryForObject(sql, new MemberRowMapper(), phone);
        }
        catch (EmptyResultDataAccessException e) {
            result = true;
        }
        return result;
    }

    public Optional<MemberDto> findByPhone(String phone) {
        String sql = "SELECT * FROM MEMBER WHERE PHONE = ?";
        MemberDto member = null;
        try {
            member = jdbcTemplate.queryForObject(sql, new MemberRowMapper(), phone);
            return Optional.ofNullable(member);

        }
        catch (EmptyResultDataAccessException ignored) {
            System.out.println("아이디가 없습니다.");
            return Optional.empty();
        }
    }

    public boolean NaverLogin(String Id, String phone) {
        String sql = "SELECT * FROM MEMBER WHERE Id = ? AND PHONE = ?";
        boolean result = true;
        try {
            MemberDto member = jdbcTemplate.queryForObject(sql, new MemberRowMapper(), Id, phone);
            return result;
        }
        catch (EmptyResultDataAccessException e) {
            result = false;
        }
        return  result;
    }

}
