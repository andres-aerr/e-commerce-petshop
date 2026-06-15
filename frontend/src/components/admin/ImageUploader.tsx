'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  label?: string;
}

// TODO: Replace with real file upload API call.
// This component simulates image upload and returns a mock URL.
export default function ImageUploader({
  currentImage,
  onImageChange,
  label = 'Imagen',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // Simulate upload delay
    setUploading(true);

    // TODO: Replace with real upload to server:
    // const formData = new FormData();
    // formData.append('file', file);
    // const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    // const { url } = await res.json();
    // onImageChange(url);

    setTimeout(() => {
      setUploading(false);
      // For mock, we keep the local preview URL.
      // Backend dev should replace with the actual server URL.
      onImageChange(localUrl);
    }, 800);
  }

  function handleRemove() {
    setPreview(null);
    onImageChange('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      {label && <p className="text-sm font-medium text-primary mb-2">{label}</p>}

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg border border-gray-light"
          />
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border border-gray-light flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5 text-gray-dark" />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-dark font-medium">Subiendo...</span>
            </div>
          )}
        </div>
      ) : (
        <label className="inline-flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-light rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
          <Upload className="w-6 h-6 text-gray-dark mb-1" />
          <span className="text-xs text-gray-dark font-medium">Subir imagen</span>
          <span className="text-xs text-gray-dark mt-0.5">PNG, JPG</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelected}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
