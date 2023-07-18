package com.kraken.taskspaceuserservice.dto;

import lombok.*;

import java.util.Date;

@Data
@Setter
@Getter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private Date dateOfBirth;
    private String password;


}
