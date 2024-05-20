package photography.photography.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import photography.photography.model.Reservation;
import photography.photography.model.User;
import photography.photography.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import photography.photography.respository.UserRepo;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo repo;

    @GetMapping("/get-user/{username}")
    public User getUser(@PathVariable String username){
        return userService.getUser(username);
    }

    @GetMapping("/photographers/{city}")
    public ResponseEntity<?> getPhotographers(@PathVariable String city){
        return userService.getPhotographerByCity(city);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<?> getUserByCity(@PathVariable String city){
        return userService.findUser(city);
    }

    @GetMapping("/reservations/{username}")
    public ResponseEntity<?> getReservations(@PathVariable String username){
        return userService.getReservations(username);
    }

    @PostMapping("/create/reservation")
    public ResponseEntity<?> createReservation(
            @RequestParam("username") String username,@RequestParam("phone") String phone,
            @RequestParam("photographer") String photographer, @RequestParam("date") String date,
            @RequestParam("name") String name, @RequestParam("type") String type,
            @RequestParam("city") String city){
        
        String id = UUID.randomUUID().toString();
        User user = userService.getUser(username);
        User photographerUser = userService.getUser(photographer);
        Reservation reservation = Reservation
            .builder()
            .id(id)
            .photographerName(photographerUser.getName())
            .user(user)
            .type(type)
            .status("pending")
            .city(city)
            .phone(phone)
            .name(name)
            .photographer(photographerUser)
            .date(date)
            .build();
        user.addReservation(reservation);
        photographerUser.addReservation(reservation);
        repo.save(user);
        repo.save(photographerUser);
        return userService.createReservation(reservation);
    }

    @PostMapping("edit/photographer")
    public ResponseEntity<?> editPhotographer(
            @RequestParam("username") String username,
            @RequestParam("city") String city,
            @RequestParam("phone") String phone,
            @RequestParam("name") String name,
            @RequestParam("availability") String availability,
            @RequestParam("price") String price){
        
            
            return userService.editPhotographer(username, name, city, phone, availability, price);
    }

    @PostMapping("/status")
    public void updateStatus(@RequestParam("id") String id, @RequestParam("status") String status){
        userService.setStatus(id, status);
    }

    @DeleteMapping("/delete/reservation/{id}")
    public void deleteReservation(@PathVariable String id){
        userService.deleteReservation(id);
    }


}