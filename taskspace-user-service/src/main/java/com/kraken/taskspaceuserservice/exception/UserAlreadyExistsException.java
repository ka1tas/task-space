package com.kraken.taskspaceuserservice.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAlreadyExistsException extends Exception{
    private String message;
}
