package com.kraken.taskspaceuserservice.controller;

import com.kraken.taskspaceuserservice.service.UserImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private final UserImageService imageService;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/upload")
    public void uploadImage(@RequestParam("userImage") MultipartFile file , @RequestParam("userName") String userName) throws IOException {
        imageService.saveUserImage(file,userName);
    }

    @GetMapping("/download/{userName}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String userName) {
        byte[] image = imageService.downloadImage(userName);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }
}
