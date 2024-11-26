package com.kraken.taskspaceuserservice.controller;

import com.kraken.taskspaceuserservice.dto.AuthenticationResponse;
import com.kraken.taskspaceuserservice.dto.UserRequest;
import com.kraken.taskspaceuserservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addUser(@RequestBody UserRequest userRequest) {
        try {
            if (null == userRequest.getEmail() || null == userRequest.getUserName()) {
                throw new Exception("Email or Username should not be empty.");
            }
            userService.addUser(userRequest);
            return new ResponseEntity<String>("{ \"message\": \"" + "User added successfully" + "\"}",
                    HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<String>("{ \"errorMessage\": \"" + e.getMessage() + "\"}", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@RequestBody UserRequest userRequest) {
        try {
            if (null == userRequest.getUserName()) {
                throw new Exception("Username should not be empty.");
            }
            return ResponseEntity.ok(userService.authenticate(userRequest));

        } catch (Exception e) {
            return new ResponseEntity<AuthenticationResponse>(AuthenticationResponse.builder().errorMessage(e.getMessage()).build(), HttpStatus.UNAUTHORIZED);
        }
    }


}
