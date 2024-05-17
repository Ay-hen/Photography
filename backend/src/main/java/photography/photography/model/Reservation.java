package photography.photography.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reservation {
    @Id
    private String id;
    private String photographer;
    private String status;
    private String date;
    private String type;
    private String city;
    private String hour;
    
    @DBRef
    private User user;
}
