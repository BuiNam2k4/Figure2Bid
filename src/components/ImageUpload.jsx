import { useCallback, useEffect, useRef, useState } from "react";
import {
  createPreviewUrl,
  IMAGE_UPLOAD_CONFIG,
  revokePreviewUrl,
  uploadImage,
  validateImageFile,
} from "../services/imageService";

/**
 * ImageUpload — Reusable drag-and-drop image upload component.
 *
 * @param {Object}   props
 * @param {string}   [props.folder]        Cloudinary folder / category.
 * @param {boolean}  [props.multiple]      Allow multiple files (default: false).
 * @param {number}   [props.maxFiles]      Max files when multiple (default: 5).
 * @param {Function} [props.onUploadComplete]  Called with upload result data.
 * @param {Function} [props.onUploadError]     Called with error message.
 * @param {Function} [props.onChange]       Called with the current file list (File[]).
 * @param {string}   [props.className]     Extra wrapper class.
 */
export default function ImageUpload({
  folder,
  multiple = false,
  maxFiles = 5,
  onUploadComplete,
  onUploadError,
  onChange,
  className = "",
}) {
  const inputRef = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]); // { file, previewUrl, status, progress, result, error }
  const dragCounterRef = useRef(0);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => revokePreviewUrl(f.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── File handling ──────────────────────────────────────── */

  const addFiles = useCallback(
    (newFiles) => {
      const incoming = Array.from(newFiles);
      const limit = multiple ? maxFiles : 1;

      // If single mode, clear existing
      if (!multiple) {
        files.forEach((f) => revokePreviewUrl(f.previewUrl));
      }

      const current = multiple ? [...files] : [];
      const remaining = limit - current.length;

      if (remaining <= 0) {
        onUploadError?.(`Chỉ được tải lên tối đa ${limit} ảnh.`);
        return;
      }

      const toAdd = incoming.slice(0, remaining).map((file) => {
        const validation = validateImageFile(file);
        return {
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
          file,
          previewUrl: validation.valid ? createPreviewUrl(file) : null,
          status: validation.valid ? "pending" : "error", // pending | uploading | done | error
          progress: 0,
          result: null,
          error: validation.valid ? null : validation.error,
        };
      });

      const updated = [...current, ...toAdd];
      setFiles(updated);
      onChange?.(updated.map((f) => f.file));
    },
    [files, multiple, maxFiles, onChange, onUploadError]
  );

  /* ── Drag & Drop ────────────────────────────────────────── */

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (dragCounterRef.current === 1) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setDragging(false);

    const droppedFiles = e.dataTransfer?.files;
    if (droppedFiles?.length) {
      addFiles(droppedFiles);
    }
  };

  /* ── Upload ─────────────────────────────────────────────── */

  const handleUpload = async (fileEntry) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileEntry.id
          ? { ...f, status: "uploading", progress: 0, error: null }
          : f
      )
    );

    try {
      const result = await uploadImage(fileEntry.file, {
        folder,
        onProgress: (progress) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileEntry.id ? { ...f, progress } : f
            )
          );
        },
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileEntry.id
            ? { ...f, status: "done", progress: 100, result }
            : f
        )
      );

      onUploadComplete?.(result);
    } catch (error) {
      const message = error.message || "Tải ảnh thất bại.";

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileEntry.id ? { ...f, status: "error", error: message } : f
        )
      );

      onUploadError?.(message);
    }
  };

  const handleUploadAll = () => {
    const pendingFiles = files.filter((f) => f.status === "pending");
    pendingFiles.forEach(handleUpload);
  };

  /* ── Remove ─────────────────────────────────────────────── */

  const handleRemove = (fileEntry) => {
    revokePreviewUrl(fileEntry.previewUrl);
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== fileEntry.id);
      onChange?.(updated.map((f) => f.file));
      return updated;
    });
  };

  /* ── Render ─────────────────────────────────────────────── */

  const hasPending = files.some((f) => f.status === "pending");

  return (
    <div className={`img-upload ${className}`}>
      {/* Drop zone */}
      <div
        className={`img-upload__zone ${isDragging ? "img-upload__zone--active" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={IMAGE_UPLOAD_CONFIG.allowedTypes.join(",")}
          multiple={multiple}
          className="img-upload__input"
          onChange={(e) => {
            if (e.target.files?.length) {
              addFiles(e.target.files);
            }
            e.target.value = "";
          }}
        />

        <div className="img-upload__zone-content">
          <span className="material-symbols-outlined img-upload__zone-icon">
            {isDragging ? "download" : "cloud_upload"}
          </span>
          <p className="img-upload__zone-title">
            {isDragging ? "Thả ảnh tại đây" : "Kéo thả ảnh hoặc nhấn để chọn"}
          </p>
          <p className="img-upload__zone-hint">
            {IMAGE_UPLOAD_CONFIG.allowedExtensions.join(", ")} — Tối đa{" "}
            {IMAGE_UPLOAD_CONFIG.maxFileSizeLabel}
            {multiple ? ` · Tối đa ${maxFiles} ảnh` : ""}
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="img-upload__list">
          {files.map((entry) => (
            <div key={entry.id} className="img-upload__item">
              {/* Preview */}
              <div className="img-upload__preview">
                {entry.previewUrl ? (
                  <img
                    src={entry.previewUrl}
                    alt={entry.file.name}
                    className="img-upload__preview-img"
                  />
                ) : (
                  <span className="material-symbols-outlined img-upload__preview-placeholder">
                    broken_image
                  </span>
                )}

                {/* Progress overlay */}
                {entry.status === "uploading" && (
                  <div className="img-upload__progress-overlay">
                    <div
                      className="img-upload__progress-bar"
                      style={{ width: `${entry.progress}%` }}
                    />
                    <span className="img-upload__progress-text">
                      {entry.progress}%
                    </span>
                  </div>
                )}

                {/* Status badge */}
                {entry.status === "done" && (
                  <span className="img-upload__badge img-upload__badge--done">
                    <span className="material-symbols-outlined">check_circle</span>
                  </span>
                )}

                {entry.status === "error" && (
                  <span className="img-upload__badge img-upload__badge--error">
                    <span className="material-symbols-outlined">error</span>
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="img-upload__info">
                <p className="img-upload__filename">{entry.file.name}</p>
                <p className="img-upload__filesize">
                  {(entry.file.size / 1024).toFixed(1)} KB
                </p>
                {entry.error && (
                  <p className="img-upload__error">{entry.error}</p>
                )}
                {entry.status === "done" && entry.result?.url && (
                  <a
                    href={entry.result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="img-upload__link"
                  >
                    Xem ảnh ↗
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="img-upload__actions">
                {entry.status === "pending" && (
                  <button
                    type="button"
                    className="img-upload__action-btn img-upload__action-btn--upload"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload(entry);
                    }}
                    title="Tải lên"
                  >
                    <span className="material-symbols-outlined">upload</span>
                  </button>
                )}

                {entry.status === "error" && entry.previewUrl && (
                  <button
                    type="button"
                    className="img-upload__action-btn img-upload__action-btn--retry"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload(entry);
                    }}
                    title="Thử lại"
                  >
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                )}

                <button
                  type="button"
                  className="img-upload__action-btn img-upload__action-btn--remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(entry);
                  }}
                  title="Xóa"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          ))}

          {/* Upload all button */}
          {hasPending && (
            <button
              type="button"
              className="img-upload__upload-all"
              onClick={handleUploadAll}
            >
              <span className="material-symbols-outlined">cloud_upload</span>
              Tải lên tất cả
            </button>
          )}
        </div>
      )}

      {/* ── Styles ──────────────────────────────────────────── */}
      <style>{`
        .img-upload {
          width: 100%;
        }

        /* ─── Drop Zone ─────────────────────────────────── */
        .img-upload__zone {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          padding: 2rem;
          border: 2px dashed #cbd5e1;
          border-radius: 1rem;
          background: #f8fafc;
          cursor: pointer;
          transition: border-color .25s, background .25s, box-shadow .25s;
          outline: none;
        }

        .img-upload__zone:hover,
        .img-upload__zone:focus-visible {
          border-color: #b81120;
          background: rgba(184, 17, 32, .03);
        }

        .img-upload__zone--active {
          border-color: #b81120;
          background: rgba(184, 17, 32, .06);
          box-shadow: inset 0 0 0 3px rgba(184, 17, 32, .08);
        }

        .img-upload__input {
          position: absolute;
          inset: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          pointer-events: none;
        }

        .img-upload__zone-content {
          text-align: center;
        }

        .img-upload__zone-icon {
          font-size: 40px;
          color: #94a3b8;
          margin-bottom: .5rem;
          display: block;
          transition: color .2s, transform .3s;
        }

        .img-upload__zone--active .img-upload__zone-icon {
          color: #b81120;
          transform: translateY(4px);
        }

        .img-upload__zone-title {
          font-size: .9375rem;
          font-weight: 600;
          color: #334155;
          margin: 0 0 .25rem;
        }

        .img-upload__zone-hint {
          font-size: .75rem;
          color: #94a3b8;
          margin: 0;
        }

        /* ─── File List ─────────────────────────────────── */
        .img-upload__list {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: .625rem;
        }

        .img-upload__item {
          display: flex;
          align-items: center;
          gap: .75rem;
          padding: .625rem;
          border-radius: .75rem;
          border: 1px solid #e2e8f0;
          background: #fff;
          transition: box-shadow .2s;
        }

        .img-upload__item:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, .06);
        }

        /* Preview */
        .img-upload__preview {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: .5rem;
          overflow: hidden;
          flex-shrink: 0;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .img-upload__preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .img-upload__preview-placeholder {
          font-size: 24px;
          color: #cbd5e1;
        }

        /* Progress */
        .img-upload__progress-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, .55);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .img-upload__progress-bar {
          width: 80%;
          height: 4px;
          background: #b81120;
          border-radius: 2px;
          transition: width .2s;
        }

        .img-upload__progress-text {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
        }

        /* Badge */
        .img-upload__badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
        }

        .img-upload__badge .material-symbols-outlined {
          font-size: 18px;
        }

        .img-upload__badge--done .material-symbols-outlined {
          color: #16a34a;
        }

        .img-upload__badge--error .material-symbols-outlined {
          color: #dc2626;
        }

        /* Info */
        .img-upload__info {
          flex: 1;
          min-width: 0;
        }

        .img-upload__filename {
          font-size: .8125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .img-upload__filesize {
          font-size: .6875rem;
          color: #94a3b8;
          margin: 2px 0 0;
        }

        .img-upload__error {
          font-size: .6875rem;
          color: #dc2626;
          margin: 2px 0 0;
          line-height: 1.4;
        }

        .img-upload__link {
          font-size: .6875rem;
          font-weight: 600;
          color: #2563eb;
          margin-top: 2px;
          display: inline-block;
        }

        .img-upload__link:hover {
          text-decoration: underline;
        }

        /* Actions */
        .img-upload__actions {
          display: flex;
          gap: .375rem;
          flex-shrink: 0;
        }

        .img-upload__action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: .5rem;
          cursor: pointer;
          transition: background .2s, color .2s, transform .15s;
        }

        .img-upload__action-btn:active {
          transform: scale(.9);
        }

        .img-upload__action-btn .material-symbols-outlined {
          font-size: 18px;
        }

        .img-upload__action-btn--upload {
          background: rgba(37, 99, 235, .1);
          color: #2563eb;
        }

        .img-upload__action-btn--upload:hover {
          background: #2563eb;
          color: #fff;
        }

        .img-upload__action-btn--retry {
          background: rgba(245, 158, 11, .1);
          color: #d97706;
        }

        .img-upload__action-btn--retry:hover {
          background: #d97706;
          color: #fff;
        }

        .img-upload__action-btn--remove {
          background: rgba(220, 38, 38, .08);
          color: #dc2626;
        }

        .img-upload__action-btn--remove:hover {
          background: #dc2626;
          color: #fff;
        }

        /* Upload all */
        .img-upload__upload-all {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          padding: .625rem 1.25rem;
          border: none;
          border-radius: .75rem;
          background: linear-gradient(135deg, #b81120 0%, #d4232f 100%);
          color: #fff;
          font-family: "Be Vietnam Pro", sans-serif;
          font-size: .875rem;
          font-weight: 600;
          cursor: pointer;
          transition: box-shadow .25s, transform .15s;
          box-shadow: 0 4px 14px rgba(184, 17, 32, .2);
          align-self: flex-end;
        }

        .img-upload__upload-all:hover {
          box-shadow: 0 6px 20px rgba(184, 17, 32, .3);
          transform: translateY(-1px);
        }

        .img-upload__upload-all:active {
          transform: translateY(0) scale(.98);
        }

        .img-upload__upload-all .material-symbols-outlined {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}
