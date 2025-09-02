"use client";
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { uploadListingImage, deleteListingImage, validateImageFile, compressImage } from '@/lib/listings-utils';

type ImageUploadProps = {
  images: string[];
  onImagesChange: (images: string[]) => void;
  userId: string;
  maxImages?: number;
};

type UploadingImage = {
  id: string;
  file: File;
  preview: string;
  progress: number;
  uploading: boolean;
  error?: string;
};

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  userId, 
  maxImages = 3 
}: ImageUploadProps) {
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddMore = images.length + uploadingImages.length < maxImages;

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length - uploadingImages.length;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    for (const file of filesToProcess) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        alert(validation.error);
        continue;
      }

      const uploadId = Math.random().toString(36).substring(2, 15);
      const preview = URL.createObjectURL(file);

      const uploadingImage: UploadingImage = {
        id: uploadId,
        file,
        preview,
        progress: 0,
        uploading: true
      };

      setUploadingImages(prev => [...prev, uploadingImage]);

      try {
        // Compress image before upload
        const compressedFile = await compressImage(file);
        
        // Simulate progress updates
        for (let progress = 10; progress <= 90; progress += 20) {
          setUploadingImages(prev => 
            prev.map(img => 
              img.id === uploadId ? { ...img, progress } : img
            )
          );
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Upload to Supabase
        const imageUrl = await uploadListingImage(compressedFile, userId);

        if (imageUrl) {
          // Success
          setUploadingImages(prev => prev.filter(img => img.id !== uploadId));
          onImagesChange([...images, imageUrl]);
        } else {
          // Error
          setUploadingImages(prev => 
            prev.map(img => 
              img.id === uploadId 
                ? { ...img, uploading: false, error: 'Upload failed' }
                : img
            )
          );
        }
              } catch (err) {
          console.error('Error processing image:', err);
          setUploadingImages(prev => 
            prev.map(img => 
              img.id === uploadId 
                ? { ...img, uploading: false, error: 'Processing failed' }
                : img
            )
          );
        }

      // Clean up preview URL
      URL.revokeObjectURL(preview);
    }
  }, [images, uploadingImages.length, maxImages, onImagesChange, userId]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [handleFileSelect]);

  const removeImage = async (imageUrl: string, index: number) => {
    // Remove from display immediately
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);

    // Delete from storage in background
    try {
      await deleteListingImage(imageUrl);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const removeUploadingImage = (uploadId: string) => {
    setUploadingImages(prev => {
      const imageToRemove = prev.find(img => img.id === uploadId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== uploadId);
    });
  };

  const retryUpload = async (uploadId: string) => {
    const uploadingImage = uploadingImages.find(img => img.id === uploadId);
    if (!uploadingImage) return;

    setUploadingImages(prev => 
      prev.map(img => 
        img.id === uploadId 
          ? { ...img, uploading: true, error: undefined, progress: 0 }
          : img
      )
    );

    try {
      const compressedFile = await compressImage(uploadingImage.file);
      const imageUrl = await uploadListingImage(compressedFile, userId);

      if (imageUrl) {
        setUploadingImages(prev => prev.filter(img => img.id !== uploadId));
        onImagesChange([...images, imageUrl]);
      } else {
        setUploadingImages(prev => 
          prev.map(img => 
            img.id === uploadId 
              ? { ...img, uploading: false, error: 'Upload failed' }
              : img
          )
        );
      }
    } catch (err) {
      console.error('Error retrying upload:', err);
      setUploadingImages(prev => 
        prev.map(img => 
          img.id === uploadId 
            ? { ...img, uploading: false, error: 'Processing failed' }
            : img
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          UPLOAD UP TO {maxImages} PHOTOS
        </h3>
        <span className="text-sm text-gray-500">
          {images.length + uploadingImages.length} / {maxImages}
        </span>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Uploaded Images */}
        {images.map((imageUrl, index) => (
          <div key={imageUrl} className="relative group">
            <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`Product ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => removeImage(imageUrl, index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Uploading Images */}
        {uploadingImages.map((uploadingImage) => (
          <div key={uploadingImage.id} className="relative group">
            <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={uploadingImage.preview}
                alt="Uploading"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
              {uploadingImage.uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span className="text-sm">{uploadingImage.progress}%</span>
                  </div>
                </div>
              )}
              {uploadingImage.error && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <span className="text-sm">{uploadingImage.error}</span>
                    <button
                      onClick={() => retryUpload(uploadingImage.id)}
                      className="block mt-1 text-xs underline"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => removeUploadingImage(uploadingImage.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Upload Placeholder */}
        {canAddMore && (
          <div
            className={`aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 text-center">
              Add Photo
            </span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Instructions */}
      <div className="text-sm text-gray-500">
        <p>• Drag and drop images or click to select</p>
        <p>• Supported formats: JPG, PNG, WebP</p>
        <p>• Maximum file size: 5MB per image</p>
        <p>• Images will be automatically compressed for optimal storage</p>
      </div>
    </div>
  );
}
