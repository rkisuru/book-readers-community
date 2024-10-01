package com.rkisuru.book.file;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {

    private final String[] ALLOWED_EXTENSIONS = new String[]{"jpg", "jpeg", "png"};

    @Value("${file.upload.photos-output-path}")
    private String fileUploadPath;

    public String saveFile(
            @NonNull MultipartFile sourceFile,
            @NonNull String userId) {

        final String fileUploadSubPath = "users" + File.separator + userId;
        return uploadFile(sourceFile, fileUploadSubPath);
    }

    private String uploadFile(
            @NonNull MultipartFile sourceFile,
            @NonNull String fileUploadSubPath) {

        final String finalUploadPath = fileUploadPath + File.separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Failed to create target folder");
                return null;
            }
        }
        final String fileName = sourceFile.getOriginalFilename();

        if (!isValidExtension(fileName)) {
            return null;
        }

        final String filExtension = getFileExtension(sourceFile.getOriginalFilename());
        String targetFilePath = finalUploadPath + File.separator + System.currentTimeMillis() + "." + filExtension;
        Path targetPath = Paths.get(targetFilePath);
        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("Successfully uploaded  to {}", targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("Failed to write file", e);
        }
        return null;
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "";
        }
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }

    private boolean isValidExtension(String fileName) {
        for (String allowedExtension : ALLOWED_EXTENSIONS) {
            if (fileName.toLowerCase().endsWith(allowedExtension)) {
                return true;
            }
        } return false;
    }
}
