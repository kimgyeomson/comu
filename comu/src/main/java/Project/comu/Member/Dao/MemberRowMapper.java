package Project.comu.Member.Dao;

import Project.comu.Member.Dto.MemberDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MemberRowMapper implements RowMapper<MemberDto> {
    @Override
    public MemberDto mapRow(ResultSet rs, int rowNum) throws SQLException {

        return MemberDto.builder()
                .id(rs.getString("ID"))
                .email(rs.getString("EMAIL"))
                .password(rs.getString("PASSWORD"))
                .phone(rs.getString("phone"))
                .name(rs.getString("NAME"))
                .birth(rs.getDate("BIRTH"))
                .address(rs.getString("ADDRESS"))
                .gender(rs.getString("GENDER"))
                .foreigner(rs.getString("FOREIGNER"))
                .build();
    }
}
