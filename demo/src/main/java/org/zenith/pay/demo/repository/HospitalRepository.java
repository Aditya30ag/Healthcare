package org.zenith.pay.demo.repository;

import org.zenith.pay.demo.model.Hospital;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HospitalRepository extends MongoRepository<Hospital, String> {
}