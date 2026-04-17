/**
 * Image Upload Service
 *
 * Handles image uploads through the backend API which integrates with Cloudinary.
 * Supports single & multiple uploads, progress tracking, and file validation.
 */
import { ensureValidAccessToken } from "./authService";
import { getAccessToken } from "../utils/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/* ── Configuration ───────────────────────────────────────── */

/** Maximum file size in bytes (5 MB) */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Allowed MIME types */
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

/** Allowed file extensions (for display / secondary check) */
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

/* ── Helpers ─────────────────────────────────────────────── */

function getErrorMessage(responseBody, fallback) {
  if (!responseBody) {
    return fallback;
  }

  if (typeof responseBody.message === "string" && responseBody.message.trim()) {
    return responseBody.message;
  }

  if (typeof responseBody.error === "string" && responseBody.error.trim()) {
    return responseBody.error;
  }

  if (Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
    const firstError = responseBody.errors[0];
    if (typeof firstError === "string") {
      return firstError;
    }
    if (firstError && typeof firstError.defaultMessage === "string") {
      return firstError.defaultMessage;
    }
  }

  return fallback;
}

function humanFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ── Validation ──────────────────────────────────────────── */

/**
 * Validates a single file before upload.
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: "Không tìm thấy tệp." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Định dạng "${file.type || "không xác định"}" không được hỗ trợ. Chấp nhận: ${ALLOWED_EXTENSIONS.join(", ")}.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Tệp "${file.name}" (${humanFileSize(file.size)}) vượt quá giới hạn ${humanFileSize(MAX_FILE_SIZE)}.`,
    };
  }

  return { valid: true };
}

/**
 * Validates multiple files.
 * @param {File[]} files
 * @param {number} [maxCount=10]
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateImageFiles(files, maxCount = 10) {
  const errors = [];

  if (!files || files.length === 0) {
    return { valid: false, errors: ["Chưa chọn tệp nào."] };
  }

  if (files.length > maxCount) {
    errors.push(`Chỉ được tải lên tối đa ${maxCount} ảnh cùng lúc.`);
  }

  for (const file of files) {
    const result = validateImageFile(file);
    if (!result.valid) {
      errors.push(result.error);
    }
  }

  return { valid: errors.length === 0, errors };
}

/* ── Upload (single) ─────────────────────────────────────── */

/**
 * Upload a single image to the backend (Cloudinary).
 *
 * @param {File} file                The image file to upload.
 * @param {Object} [options]
 * @param {string} [options.folder]  Optional Cloudinary folder/category.
 * @param {(progress: number) => void} [options.onProgress]  Progress callback (0–100).
 * @param {AbortSignal} [options.signal]  AbortController signal for cancellation.
 *
 * @returns {Promise<Object>} Resolves with the backend response data
 *   (typically { url, publicId, width, height, format, ... }).
 */
export async function uploadImage(file, options = {}) {
  const { folder, onProgress, signal } = options;

  // Validate first
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Ensure we have a valid token
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  // Build multipart form
  const formData = new FormData();
  formData.append("file", file);

  if (folder) {
    formData.append("folder", folder);
  }

  // Use XMLHttpRequest for progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_BASE_URL}/api/v1/uploads/image`);
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);

    // Progress
    if (onProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      });
    }

    // Completion
    xhr.addEventListener("load", () => {
      let responseBody = null;
      try {
        responseBody = JSON.parse(xhr.responseText);
      } catch {
        responseBody = null;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        if (responseBody && responseBody.data) {
          resolve(responseBody.data);
        } else {
          resolve(responseBody);
        }
      } else {
        reject(
          new Error(
            getErrorMessage(
              responseBody,
              `Tải ảnh lên thất bại (HTTP ${xhr.status}).`,
            ),
          ),
        );
      }
    });

    // Network error
    xhr.addEventListener("error", () => {
      reject(new Error("Lỗi mạng khi tải ảnh lên. Vui lòng kiểm tra kết nối."));
    });

    // Timeout
    xhr.addEventListener("timeout", () => {
      reject(new Error("Yêu cầu tải ảnh đã hết thời gian chờ."));
    });

    // Cancellation
    if (signal) {
      signal.addEventListener("abort", () => {
        xhr.abort();
        reject(new Error("Tải ảnh đã bị hủy."));
      });
    }

    xhr.timeout = 60_000; // 60 seconds
    xhr.send(formData);
  });
}

/* ── Upload (multiple) ───────────────────────────────────── */

/**
 * Upload multiple images sequentially with individual progress tracking.
 *
 * @param {File[]} files
 * @param {Object} [options]
 * @param {string} [options.folder]
 * @param {(fileIndex: number, progress: number) => void} [options.onFileProgress]
 * @param {(fileIndex: number, result: Object) => void} [options.onFileComplete]
 * @param {(fileIndex: number, error: Error) => void} [options.onFileError]
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<{ succeeded: Object[], failed: { file: File, error: string }[] }>}
 */
export async function uploadMultipleImages(files, options = {}) {
  const { folder, onFileProgress, onFileComplete, onFileError, signal } =
    options;

  const succeeded = [];
  const failed = [];

  for (let i = 0; i < files.length; i++) {
    if (signal?.aborted) {
      // Mark remaining files as cancelled
      for (let j = i; j < files.length; j++) {
        failed.push({ file: files[j], error: "Đã hủy." });
      }
      break;
    }

    try {
      const result = await uploadImage(files[i], {
        folder,
        signal,
        onProgress: (progress) => {
          onFileProgress?.(i, progress);
        },
      });

      succeeded.push(result);
      onFileComplete?.(i, result);
    } catch (error) {
      failed.push({ file: files[i], error: error.message });
      onFileError?.(i, error);
    }
  }

  return { succeeded, failed };
}

/* ── Upload via fetch (simpler, no progress) ─────────────── */

/**
 * Simpler upload using fetch (no progress tracking).
 * Useful when progress UI is not needed.
 *
 * @param {File} file
 * @param {string} [folder]
 * @returns {Promise<Object>}
 */
export async function uploadImageSimple(file, folder) {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.append("file", file);

  if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/uploads/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  let responseBody = null;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Tải ảnh lên thất bại."));
  }

  if (responseBody && responseBody.data) {
    return responseBody.data;
  }

  return responseBody;
}

/* ── Delete ───────────────────────────────────────────────── */

/**
 * Delete an image by its publicId (Cloudinary public ID).
 *
 * @param {string} publicId
 * @returns {Promise<void>}
 */
export async function deleteImage(publicId) {
  if (!publicId) {
    throw new Error("publicId là bắt buộc để xóa ảnh.");
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/uploads/image?publicId=${encodeURIComponent(publicId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    let responseBody = null;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = null;
    }

    throw new Error(getErrorMessage(responseBody, "Xóa ảnh thất bại."));
  }
}

/* ── Utilities ────────────────────────────────────────────── */

/**
 * Create a local preview URL for an image file.
 * Remember to call `URL.revokeObjectURL(url)` when done.
 *
 * @param {File} file
 * @returns {string} Object URL
 */
export function createPreviewUrl(file) {
  return URL.createObjectURL(file);
}

/**
 * Revoke a previously created preview URL to free memory.
 *
 * @param {string} url
 */
export function revokePreviewUrl(url) {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

/** Re-export config for external use */
export const IMAGE_UPLOAD_CONFIG = {
  maxFileSize: MAX_FILE_SIZE,
  maxFileSizeLabel: humanFileSize(MAX_FILE_SIZE),
  allowedTypes: ALLOWED_TYPES,
  allowedExtensions: ALLOWED_EXTENSIONS,
};
