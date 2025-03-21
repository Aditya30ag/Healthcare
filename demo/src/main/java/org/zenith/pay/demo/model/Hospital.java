package org.zenith.pay.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "hospitals")
public class Hospital {
    @Id
    private String id;
    private String name;
    private List<String> patients;
}
