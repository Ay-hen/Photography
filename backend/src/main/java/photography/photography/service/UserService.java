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
                .filter(user -> "photographer".equals(user.getRole()) && !user.getSuspended())
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

    public ResponseEntity<?> getReservations(String username){
        List<Reservation> reservations = userRepo.findByUsername(username).get().getReservations();
        if(reservations.isEmpty()){
            return ResponseEntity.badRequest().body("No reservations found");
        }else{
            return ResponseEntity.ok(reservations);
        }
    }

    public void deleteReservation(String id){
        Reservation reservation = reservationRepo.findById(id).get();
        User user = reservation.getUser();
        User photographer = reservationRepo.findById(id).get().getPhotographer();

        user.removeReservation(reservation);
        photographer.removeReservation(reservation);

        userRepo.save(user);
        userRepo.save(photographer);

        reservationRepo.deleteById(id);
    }

    public ResponseEntity<?> getPhotographerByCity(String city){
        List<User> users = userRepo.findByCityAndRole(city, "photographer");
        if(users.isEmpty()){
            return ResponseEntity.badRequest().body("No photographers found in the city");
        }else{
            return ResponseEntity.ok(users);
        }
    }

    public ResponseEntity<?> editPhotographer(String username,String name, String city, String phone, String availability, String price){
        User user = userRepo.findByUsername(username).get();
        user.setAvailability(availability);
        user.setPrice(price);

        if(!city.equals("") && !name.equals("") && !phone.equals("")){
            user.setCity(city);
            user.setName(name);
            user.setPhone(phone);
        }
        userRepo.save(user);
        return ResponseEntity.ok().body(Map.of("message", "Ok"));
    }

    public ResponseEntity<?> setStatus(String id, String status){
        Reservation reservation = reservationRepo.findById(id).get();
        reservation.setStatus(status);
        reservationRepo.save(reservation);
        User photographer = reservation.getPhotographer();
        photographer.removeReservation(reservation);
        userRepo.save(photographer);
        return ResponseEntity.ok("Done");
    }

    public ResponseEntity<?> getAllReservations(){
        return ResponseEntity.ok(reservationRepo.findAll());
    }

    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userRepo.findAll());
    }

    public void deleteUser(String username){
        userRepo.delete(userRepo.findByUsername(username).get());
    }

    public ResponseEntity<?> suspendUser(String username){
        User user = userRepo.findByUsername(username).get();
        user.setSuspended(true);
        userRepo.save(user);
        return ResponseEntity.ok().body(Map.of("message", "Ok"));
    }

    public ResponseEntity<?> unsuspendUser(String username){
        User user = userRepo.findByUsername(username).get();
        user.setSuspended(false);
        userRepo.save(user);
        return ResponseEntity.ok().body(Map.of("message", "Ok"));
    }

    public ResponseEntity<?> getAllPhotographers(){
        List <User> users = userRepo.findByRole("photographer");
        return ResponseEntity.ok(users);
    }

    public ResponseEntity<?> getAllClients(){
        List <User> users = userRepo.findByRole("client");
        return ResponseEntity.ok(users);
    }
    public ResponseEntity<?> getAllSuspended(){
        List <User> users = userRepo.findBySuspended(true);
        return ResponseEntity.ok(users);
    }


}
