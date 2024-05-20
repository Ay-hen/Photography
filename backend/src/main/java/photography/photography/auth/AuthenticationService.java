package photography.photography.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lombok.RequiredArgsConstructor;
import photography.photography.model.Token;
import photography.photography.model.User;
import photography.photography.respository.TokenRepo;
import photography.photography.respository.UserRepo;
import photography.photography.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private TokenRepo tokenRepo;

    @Autowired
    private UserRepo repo;

    @Autowired 
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;


    public ResponseEntity<?> register(RegisterRequest request) {

        if (repo.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Username already used");
        }
    
        // Check if email is already taken
        if (repo.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Email already used");
        }

        if("photographer".equals(request.getRole())){
            
            User user = User.builder()
                    .name(request.getName())
                    .username(request.getUsername())
                    .phone(request.getPhone())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .availability("Available")
                    .price("100 DH/Hour")
                    .suspended(false)
                    .role(request.getRole())
                    .city(request.getCity())
                    .build();
                var jwtToken = jwtService.generateToken(user);

        Token tk = Token.builder()
            .token(jwtToken)
            .expired(false)
            .build();

        user.setToken(tk);

        repo.save(user);
        tokenRepo.save(tk);

        return ResponseEntity.ok(AuthenticationResponse.builder()
            .token(jwtToken)
            .role(user.getRole())
            .build());
        } else {

            var user = User.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .suspended(false)
                .role(request.getRole())
                .build();

            var jwtToken = jwtService.generateToken(user);

            Token tk = Token.builder()
                .token(jwtToken)
                .expired(false)
                .build();

            user.setToken(tk);

            repo.save(user);
            tokenRepo.save(tk);

            return ResponseEntity.ok(AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build());
        }
        
    }

    /* ******************************* Login ******************************* */

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        var user = repo.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    
        System.out.println(user);
        if(user.getSuspended()){
            System.out.println(user);
            throw new RuntimeException("User is suspended");
        }else{
        var jwtToken = jwtService.generateToken(user);
    
        Token tk = Token.builder()
                .token(jwtToken)
                .expired(false)
                .build();
    
        user.setToken(tk);
    
        tokenRepo.save(tk);
        repo.save(user);
    
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();
        }
        
    }

    /* ******************************* Logout ******************************* */
    public ResponseEntity<?> logout(String username) {
        var user = repo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    
        if (user.getToken() != null) {
            // Fetch the token document from the token repository
            var tokenId = user.getToken().getToken();
            var token = tokenRepo.findById(tokenId).orElseThrow(() -> new RuntimeException("Token not found"));

            
            // Delete the token from the repository
            tokenRepo.delete(token);
    
            // Set user's token to null
            user.setToken(null);
    
            if ("photographer".equals(user.getRole())) {
                user.setAvailability("Not Available");
            }
    
            // Save the user
            repo.save(user);
    
            return ResponseEntity.ok("Logged out successfully");
        } else {
            System.out.println("No token found for user: " + user.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No token found for user");
        }
    }
    

}
