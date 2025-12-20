'use client';

import { CloudUpload, XIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface ImageUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImagesChange?: (images: Array<ImageFile>) => void;
  onUploadComplete?: (images: Array<ImageFile>) => void;
}

export default function FileUploader({
  maxFiles = 10,
  maxSize = 2 * 1024 * 1024,
  accept = 'image/*',
  className,
  onImagesChange,
  onUploadComplete,
}: ImageUploadProps) {
  const [images, setImages] = useState<Array<ImageFile>>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'File must be an image';
    }
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    if (images.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  const addImages = useCallback(
    (files: FileList | Array<File>) => {
      const newImages: Array<ImageFile> = [];
      const newErrors: Array<string> = [];

      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(`${file.name}: ${error}`);
          return;
        }

        const imageFile: ImageFile = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: 'uploading',
        };

        newImages.push(imageFile);
      });

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange?.(updatedImages);

        newImages.forEach((imageFile) => {
          simulateUpload(imageFile);
        });
      }
    },
    [images, maxSize, maxFiles, onImagesChange]
  );

  const simulateUpload = (imageFile: ImageFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setImages((prev) =>
          prev.map((img) =>
            img.id === imageFile.id
              ? { ...img, progress: 100, status: 'completed' as const }
              : img
          )
        );

        const updatedImages = images.map((img) =>
          img.id === imageFile.id
            ? { ...img, progress: 100, status: 'completed' as const }
            : img
        );

        if (updatedImages.every((img) => img.status === 'completed')) {
          onUploadComplete?.(updatedImages);
        }
      } else {
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageFile.id ? { ...img, progress } : img
          )
        );
      }
    }, 100);
  };

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        addImages(files);
      }
    },
    [addImages]
  );

  const openFileDialog = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        addImages(target.files);
      }
    };
    input.click();
  }, [accept, addImages]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full max-w-4xl', className)}>
      <div>
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2.5">
            {images.map((imageFile, index) => (
              <Card
                key={imageFile.id}
                className="group relative flex size-48 shrink-0 rounded-md bg-accent/50 shadow-none"
              >
                <img
                  src={imageFile.preview}
                  className="absolute inset-0 size-full rounded-md object-cover"
                  alt={`Product view ${index + 1}`}
                />

                {/* Remove Button Overlay */}
                <Button
                  onClick={() => removeImage(imageFile.id)}
                  variant="destructiveSoft"
                  size="icon"
                  className="absolute end-2 top-2 size-6 rounded-full opacity-0 shadow-sm group-hover:opacity-100"
                >
                  <XIcon className="size-3.5" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
      {images.length === 0 && (
        <Card
          className={cn(
            'rounded-md border-dashed shadow-none transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardContent className="text-center">
            <div className="mx-auto mb-3 flex size-[32px] items-center justify-center rounded-full border border-border">
              <CloudUpload className="size-4" />
            </div>
            <h3 className="text-2sm mb-0.5 font-semibold text-foreground">
              Choose a file or drag & drop here.
            </h3>
            <span className="mb-3 block text-xs font-normal text-secondary-foreground">
              JPEG, PNG, up to {formatBytes(maxSize)}.
            </span>
            <Button size="sm" variant="secondary" onClick={openFileDialog}>
              Browse File
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
