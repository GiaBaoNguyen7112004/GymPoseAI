package com.pbl5.gympose.service.storage.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.pbl5.gympose.exception.BadRequestException;
import com.pbl5.gympose.service.storage.StorageService;
import com.pbl5.gympose.utils.FileUtils;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService implements StorageService {
    private static final Object POSE_ERROR_PIC_WIDTH = 350;
    private static final Object POSE_ERROR_PIC_HEIGHT = 350;
    private static final Object NORMAL_PIC_WIDTH = 100;
    private static final Object NORMAL_PIC_HEIGHT = 100;
    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile multipartFile) {
        String fileUrl = null;
        File file = FileUtils.convertMultiPartToFile(multipartFile);
        try {
            String mimeType = FileUtils.getMineType(file);
            if (FileUtils.checkMimeType(mimeType)) {
                Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
                file.delete();
                fileUrl = uploadResult.get("url").toString();
            } else {
                FileUtils.deleteFile(file);
                throw new BadRequestException(ErrorMessage.FILE_NOT_FORMATTED);
            }
        } catch (BadRequestException badRequestException) {
            throw badRequestException;
        } catch (Exception e) {
            LogUtils.error(e.getMessage());
        }

        return fileUrl;
    }

    @Override
    public String uploadFileWithFolder(MultipartFile multipartFile, String folder, Object width, Object height) {
        if (multipartFile == null) throw new BadRequestException(ErrorMessage.FILE_MISSING);
        String fileUrl = null;
        File file = FileUtils.convertMultiPartToFile(multipartFile);
        try {
            FileUtils.checkSizeFile(file);
            String mimeType = FileUtils.getMineType(file);
            if (FileUtils.checkMimeType(mimeType)) {
                Map uploadResult = cloudinary.uploader().upload(file,
                        ObjectUtils.asMap(
                                "folder", folder,
                                "secure", true,  // Thêm secure: true
                                "transformation", new Transformation()
                                        .width(width)
                                        .height(height)
                                        .crop("limit") // giữ tỷ lệ, không vượt quá
                                        .quality("auto") // tự động nén ảnh
                                        .fetchFormat("auto") // chọn định dạng nhẹ nhất (WebP/AVIF nếu có)
                                        .flags("strip_profile") // xóa metadata: EXIF, ICC profile, etc.
                        ));
                FileUtils.deleteFile(file);
                fileUrl = uploadResult.get("secure_url").toString();
            } else {
                FileUtils.deleteFile(file);
                throw new BadRequestException(ErrorMessage.FILE_NOT_FORMATTED);
            }
        } catch (BadRequestException badRequestException) {
            throw badRequestException;
        } catch (Exception e) {
            LogUtils.error(e.getMessage());
        }
        return fileUrl;
    }

    @Override
    public boolean deleteFile(String publicId) {
        try {
            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return result.get("result").equals("ok");
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessage.IMAGE_DELETE_FAILED);
        }
    }

    @Override
    public String extractPublicIdFromUrl(String imageUrl) {
        // Ví dụ: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/image.jpg
        // PublicId sẽ là: folder/image
        int startIndex = imageUrl.indexOf("/upload/") + 8;
        int lastDotIndex = imageUrl.lastIndexOf(".");

        String publicIdWithVersion = imageUrl.substring(startIndex, lastDotIndex != -1
                ? lastDotIndex : imageUrl.length());

        // Loại bỏ version nếu có (v1234567890/)
        if (publicIdWithVersion.contains("/")) {
            int versionEndIndex = publicIdWithVersion.indexOf("/") + 1;
            return publicIdWithVersion.substring(versionEndIndex);
        }

        return publicIdWithVersion;
    }

    @Override
    public String uploadPicture(MultipartFile multipartFile, String folder, boolean isPoseErrorPic) {
        return isPoseErrorPic ? uploadFileWithFolder(multipartFile, folder, POSE_ERROR_PIC_WIDTH, POSE_ERROR_PIC_HEIGHT)
                : uploadFileWithFolder(multipartFile, folder, NORMAL_PIC_WIDTH, NORMAL_PIC_HEIGHT);
    }
}