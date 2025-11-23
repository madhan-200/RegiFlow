package com.example.event.repository;

import com.example.event.model.Registration;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends MongoRepository<Registration, String> {
    List<Registration> findByUser_Id(String userId);

    Optional<Registration> findByUser_IdAndEvent_Id(String userId, String eventId);

    long countByEvent_Id(String eventId);
}
