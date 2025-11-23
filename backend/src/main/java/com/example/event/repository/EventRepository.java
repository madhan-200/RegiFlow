package com.example.event.repository;

import com.example.event.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(String name, String location);
}
