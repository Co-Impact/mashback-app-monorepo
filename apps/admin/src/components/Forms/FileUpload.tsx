import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Button, Box, Typography, FormHelperText } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type FileUploadProps = {
  name: string;
  label?: string;
  initialUrl?: string; // for edit mode
  onFileSelect?: (file: File | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ name, label, initialUrl, onFileSelect }) => {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(initialUrl || null);

  useEffect(() => {
    if (initialUrl) setPreview(initialUrl);
  }, [initialUrl]);


  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box display="flex" flexDirection="column" gap={2}>
          {label && (
            <Typography variant="subtitle1" fontWeight="500">
              {label}
            </Typography>
          )}

          {/* Preview Section */}
          <Box
            sx={{
              width: "100%",
              height: 200,
              border: "1px solid",
              borderColor: (theme) => (error ? theme.palette.error.main : theme.palette.divider),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <UploadFileIcon fontSize="large" color={error ? "error" : "action"} />
            )}
          </Box>

          {/* File Input */}
          <Button variant="outlined" component="label">
            Upload File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  onChange(file); // update react-hook-form value
                  onFileSelect?.(file);
                } else {
                  onChange(null);
                  setPreview(initialUrl || null);
                }
              }}
            />
          </Button>

          {/* Show Yup Error */}
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default FileUpload;
