package Project.comu.Member.Dto;

import lombok.Data;

@Data
public class EmailAvailabilityResponse {
    private boolean available;

    public EmailAvailabilityResponse(boolean available) {
        this.available = available;
    }

}
