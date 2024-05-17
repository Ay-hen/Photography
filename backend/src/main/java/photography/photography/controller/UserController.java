package photography.photography.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import photography.photography.model.Reservation;
import photography.photography.model.User;
import photography.photography.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get-user/{username}")
    public User getUser(@PathVariable String username){
        return userService.getUser(username);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<?> getUserByCity(@PathVariable String city){
        return userService.findUser(city);
    }

    @PostMapping("/create/reservation")
    public ResponseEntity<?> createReservation(
            @RequestParam("username") String username,
            @RequestParam("photographer") String photographer, @RequestParam("date") String date,
            @RequestParam("hour") String hour, @RequestParam("type") String type,
            @RequestParam("city") String city){
        
        String id = UUID.randomUUID().toString();
        User user = userService.getUser(username);
        Reservation reservation = Reservation
            .builder()
            .id(id)
            .user(user)
            .status("pending")
            .hour(hour)
            .city(city)
            .photographer(photographer)
            .date(date)
            .build();
        return userService.createReservation(reservation);
    }
}