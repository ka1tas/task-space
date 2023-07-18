package com.kraken.taskspaceuserservice.service;

import com.kraken.taskspaceuserservice.dto.AuthenticationResponse;
import com.kraken.taskspaceuserservice.dto.UserRequest;
import com.kraken.taskspaceuserservice.entity.User;
import com.kraken.taskspaceuserservice.exception.UserAlreadyExistsException;
import com.kraken.taskspaceuserservice.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void addUser(UserRequest user) throws UserAlreadyExistsException;
    User findUserByUserName(String userName) throws UserNotFoundException;

    AuthenticationResponse authenticate(UserRequest userRequest);
}
