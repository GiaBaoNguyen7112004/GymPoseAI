package com.pbl5.gympose.utils;

import com.pbl5.gympose.exception.BadRequestException;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;
import java.util.Objects;

public final class FileUtils {

    private FileUtils() {
    }

    public static boolean checkMimeType(String mimeType) {
        return mimeType.startsWith("application")
                || mimeType.equals("application/msword")
                || mimeType.startsWith("image")
                || mimeType.startsWith("video")
                || mimeType.equals("text/plain")
                || mimeType.equals("text/html")
                || mimeType.equals("text/csv");
    }

    public static void deleteFile(File file) {
        if (file.delete()) {
            return;
        }
        throw new BadRequestException(ErrorMessage.FILE_DELETE_FAILED);
    }

    public static String getMineType(File file) throws IOException {
        Tika tika = new Tika();
        return tika.detect(file);
    }

    public static long getFileSize(File file) throws IOException {
        return Files.size(file.toPath());
    }

    public static String getFileName(MultipartFile multipartFile) {
        return multipartFile.getOriginalFilename();
    }

    public static File convertMultiPartToFile(MultipartFile file) {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        } catch (Exception e) {
            LogUtils.error(e.getMessage());
        }
        return convFile;
    }

    public static void checkSizeFile(File file) {
        long size;
        try {
            size = Files.size(file.toPath());
            if (size > 10485760) {
                FileUtils.deleteFile(file);
                throw new BadRequestException(ErrorMessage.FILE_SIZE_EXCEEDED);
            }
        } catch (IOException e) {
            LogUtils.error(e.getMessage());
        }
    }

    public static String generateFileName(String fileName) {
        return new Date().getTime() + "-" + fileName.replace(" ", "_");
    }
}
