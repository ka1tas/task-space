package com.kraken.taskspaceuserservice.service;

import com.kraken.taskspaceuserservice.dto.UserResponse;
import com.kraken.taskspaceuserservice.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface UserImageService {

    byte[] downloadImage(String fileName);
    boolean saveUserImage(MultipartFile file , String userName) throws IOException;



}
