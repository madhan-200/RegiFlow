package com.example.event.service;

import com.example.event.model.Event;
import com.example.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private com.example.event.repository.RegistrationRepository registrationRepository;

    public List<Event> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        events.forEach(event -> event.setRegistrationCount(registrationRepository.countByEvent_Id(event.getId())));
        return events;
    }

    public List<Event> searchEvents(String keyword) {
        List<Event> events = eventRepository.findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(keyword,
                keyword);
        events.forEach(event -> event.setRegistrationCount(registrationRepository.countByEvent_Id(event.getId())));
        return events;
    }

    public Event getEventById(String id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setRegistrationCount(registrationRepository.countByEvent_Id(id));
        return event;
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(String id, Event eventDetails) {
        Event event = getEventById(id);
        event.setName(eventDetails.getName());
        event.setDate(eventDetails.getDate());
        event.setLocation(eventDetails.getLocation());
        event.setDescription(eventDetails.getDescription());
        return eventRepository.save(event);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
