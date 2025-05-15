package com.pbl5.gympose.service.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String uploadFile(MultipartFile file);

    String uploadFileWithFolder(MultipartFile file, String folder);

    boolean deleteFile(String publicId);

    String extractPublicIdFromUrl(String imageUrl);
}
