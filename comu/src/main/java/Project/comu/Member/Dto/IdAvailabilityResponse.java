package Project.comu.Member.Dto;

import lombok.Data;

@Data
public class IdAvailabilityResponse {
    private boolean available;

    public IdAvailabilityResponse(boolean available) {
        this.available = available;
    }

}
