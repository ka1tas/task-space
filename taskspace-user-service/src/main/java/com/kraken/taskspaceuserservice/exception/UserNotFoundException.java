package com.kraken.taskspaceuserservice.exception;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserNotFoundException extends Exception {
    private String message;


}
