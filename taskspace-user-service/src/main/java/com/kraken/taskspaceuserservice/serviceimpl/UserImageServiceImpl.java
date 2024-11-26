package com.kraken.taskspaceuserservice.serviceimpl;

import com.kraken.taskspaceuserservice.dto.UserResponse;
import com.kraken.taskspaceuserservice.entity.User;
import com.kraken.taskspaceuserservice.repository.UserRepository;
import com.kraken.taskspaceuserservice.service.UserImageService;
import com.kraken.taskspaceuserservice.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserImageServiceImpl implements UserImageService {

    @Autowired
    private UserRepository userRepository;

    public boolean saveUserImage(MultipartFile file , String userName) throws IOException {
        Optional<User> userData = userRepository.findByUserName(userName);
        if(userData.isPresent()){
           User user =  userData.get();
           user.setUserImage(ImageUtil.compressImage(file.getBytes()));
           userRepository.save(user);
           return true;
        }
        return false;
    }

    public byte[] downloadImage(String userName){
        Optional<User> user = userRepository.findByUserName(userName);
        return ImageUtil.decompressImage(user.get().getUserImage());
    }
}
