package com.kraken.taskspaceuserservice.serviceimpl;

import com.kraken.taskspaceuserservice.config.JWTService;
import com.kraken.taskspaceuserservice.dto.AuthenticationResponse;
import com.kraken.taskspaceuserservice.dto.UserRequest;
import com.kraken.taskspaceuserservice.dto.UserResponse;
import com.kraken.taskspaceuserservice.entity.Role;
import com.kraken.taskspaceuserservice.entity.User;
import com.kraken.taskspaceuserservice.exception.UserAlreadyExistsException;
import com.kraken.taskspaceuserservice.exception.UserNotFoundException;
import com.kraken.taskspaceuserservice.repository.UserRepository;
import com.kraken.taskspaceuserservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void addUser(UserRequest userDto) throws UserAlreadyExistsException {
        log.info("Inside adduser method in User Service Impl");
        if (!(userDto == null)) {
            User user = User.builder()
                    .firstName(userDto.getFirstName())
                    .lastName(userDto.getLastName())
                    .userName(userDto.getUserName())
                    .email(userDto.getEmail())
                    .gender(userDto.getGender())
                    .dateOfBirth(userDto.getDateOfBirth())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .role(Role.USER)
                    .build();

            log.debug("The user received is - {}", user.toString());

            if (userRepository.findByUserName(user.getUsername()).isPresent()) {
                throw new UserAlreadyExistsException("The UserName is already present");
            } else if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("The email is already present");
            }
            userRepository.save(user);
            log.info("User Added successfully.");
        }
    }

    @Override
    public User findUserByUserName(String username) throws UserNotFoundException {
        log.info("Inside findUserByUserName method in User Service Impl");
        return userRepository.findByUserName(username).orElseThrow(
                () -> new UserNotFoundException("user Not Found")
        );
    }

    @Override
    public AuthenticationResponse authenticate(UserRequest userRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequest.getUserName() , userRequest.getPassword())
        );

        var user = userRepository.findByUserName(userRequest.getUserName()).orElseThrow();
        UserResponse userResponse = UserResponse.builder()
                .userName(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .role(user.getRole())
                .build();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(userResponse)
                .build();

    }
}
