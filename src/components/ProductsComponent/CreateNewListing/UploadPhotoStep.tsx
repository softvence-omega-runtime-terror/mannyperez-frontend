import { useState, useRef, DragEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { StepCard } from './StepCard';

interface UploadPhotoStepProps {
  stepNumber?: number;
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
  acceptedFormats?: string[];
  maxSize?: number;
  selectedFile?: File | null;
}

export function UploadPhotoStep({
  stepNumber = 1,
  onFileSelect,
  onFileRemove,
  acceptedFormats = ['PNG', 'JPG'],
  maxSize = 10,
  selectedFile = null,
}: UploadPhotoStepProps) {
  const [file, setFile] = useState<File | null>(selectedFile);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileChange(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileRemove) {
      onFileRemove();
    }
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      title="Upload Photo"
      subtitle="Must include handwritten seller name date visible in photo"
      isRequired
    >
      <div className="space-y-4">
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative rounded-lg border-2 border-dashed transition-all duration-200
              ${isDragging
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>

              <p className="mb-2 text-base font-medium text-gray-700">
                Drag and drop your proof photo here
              </p>

              <p className="mb-4 text-sm text-gray-500">or click to browse files</p>

              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-pink-600 hover:bg-pink-700"
              >
                Choose File
              </Button>

              <p className="mt-4 text-xs text-gray-500">
                {acceptedFormats.join(', ')} up to {maxSize}MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  handleFileChange(selectedFile);
                }
              }}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative rounded-lg border-2 border-gray-200 bg-white p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="flex-shrink-0 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-sm text-amber-900">
            <span className="font-semibold">Important Note</span>
            <br />
            Listings without proof photo will be rejected. Make sure your handwritten seller name and today's date are clearly visible.
          </AlertDescription>
        </Alert>
      </div>
    </StepCard>
  );
}
