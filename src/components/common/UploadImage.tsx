import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import { FiCamera } from "react-icons/fi";
import Icons from "./Icons";

interface ImageUploadProps {
  value?: File | null;
  error?: string;
  hint?: string;
  onChange: (file: File | null) => void;
  label?: string;
  required?: boolean;
  className?: string;
  size?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

export default function ImageUpload({
  value,
  error,
  hint,
  onChange,
  label = "Upload Image",
  required = false,
  className = "",
  size = 110,
  maxSizeMB = 2,
  acceptedTypes = ["image/jpeg", "image/png", "image/jpg"],
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      toast.error("Only JPEG or PNG images are allowed.");
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`File must be less than ${maxSizeMB}MB.`);
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    // Reset the input value so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    let url: string | null = null;

    if (value) {
      url = URL.createObjectURL(value);
      setPreview(url);
    } else {
      setPreview(null);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [value]);

  return (
    <div className={`flex flex-col items-center gap-1 relative ${className}`}>
      <label
        htmlFor="image-upload"
        style={{ width: size, height: size }}
        className="rounded-full border overflow-hidden cursor-pointer flex items-center justify-center transition-all relative bg-gray-100"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute bottom-3 right-5 bg-white rounded-full p-1 shadow-md hover:bg-light-danger hover:text-white transition"
            >
              <Icons iconName="delete" className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <FiCamera className="w-6 h-6 mb-1" />
            {label && (
              <div className="label-container">
                <FieldLabelText label={label} required={required} />
              </div>
            )}
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {error && <FieldErrorText error={error} className="text-start" />}
      {hint && !error && <FieldHelperText hint={hint} className="text-start" />}
    </div>
  );
}
