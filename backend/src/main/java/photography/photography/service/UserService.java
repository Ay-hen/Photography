package photography.photography.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import photography.photography.model.Reservation;
import photography.photography.model.User;
import photography.photography.respository.ReservationRepo;
import photography.photography.respository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    UserRepo userRepo;

    @Autowired
    ReservationRepo reservationRepo;

    


    public ResponseEntity<?> findUser(String city){
        List<User> users = userRepo.findByCity(city);
        if(users.isEmpty()){
            return ResponseEntity.badRequest().body("No users found in the city");
        }else{
            List<Map<String, String>> photographerNames = users.stream()
                .filter(user -> "photographer".equals(user.getRole()))
                .map(user -> {
                    Map<String, String> nameMap = new HashMap<>();
                    nameMap.put("name", user.getName());
                    nameMap.put("username", user.getUsername());
                    return nameMap;
                })
                .collect(Collectors.toList());
            if(photographerNames.isEmpty()){
                return ResponseEntity.badRequest().body("No photographers found in the city");
            }else{
                return ResponseEntity.ok(photographerNames);
            }
        }
    }

    public ResponseEntity<?> createReservation(Reservation reservation){
        reservationRepo.save(reservation);
        return ResponseEntity.ok("Done");
    }

    public User getUser(String username){
        return userRepo.findByUsername(username).get();
    }
}
