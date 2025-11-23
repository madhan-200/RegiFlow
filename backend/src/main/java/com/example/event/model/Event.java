package com.example.event.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    private String id;

    private String name;

    private LocalDate date;

    private String location;

    private String description;

    private Integer capacity;

    @org.springframework.data.annotation.Transient
    private long registrationCount;
}
