package com.kraken.taskspaceuserservice.dto;

import com.kraken.taskspaceuserservice.entity.Role;
import jakarta.persistence.Lob;
import lombok.*;

import java.util.Date;

@Data
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private Date dateOfBirth;
    private Role role;


}
