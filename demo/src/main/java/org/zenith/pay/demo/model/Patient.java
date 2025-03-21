package org.zenith.pay.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "patients")
public class Patient {
    @Id
    private String id;
    private String email;
    private String name;
    private String phoneNumber;
    private String password;
    private int age;
    private List<String> medicalHistory;
}
