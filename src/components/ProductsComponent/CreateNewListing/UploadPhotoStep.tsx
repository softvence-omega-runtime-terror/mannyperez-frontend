import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { StepCard } from './StepCard';

interface UploadPhotoStepProps {
  stepNumber?: number;
  onFilesSelect?: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  onRemoveExisting?: (url: string) => void;
  acceptedFormats?: string[];
  maxSize?: number;
  selectedFiles?: File[];
  existingImages?: string[];
  removedImages?: string[];
  error?: string;
}

export function UploadPhotoStep({
  stepNumber = 1,
  onFilesSelect,
  onFileRemove,
  onRemoveExisting,
  acceptedFormats = ['PNG', 'JPG'],
  maxSize = 10,
  selectedFiles = [],
  existingImages = [],
  removedImages = [],
  error,
}: UploadPhotoStepProps) {
  const [files, setFiles] = useState<File[]>(selectedFiles);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle adding new files
  const handleFilesChange = (selectedFiles: FileList | File[]) => {
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} exceeds maximum size of ${maxSize}MB`);
        return;
      }
      validFiles.push(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    if (validFiles.length > 0) {
      setFiles((prev) => {
        const updated = [...prev, ...validFiles];
        if (onFilesSelect) onFilesSelect(updated);
        return updated;
      });
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
    handleFilesChange(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    if (onFileRemove) onFileRemove(index);
    if (onFilesSelect) onFilesSelect(updatedFiles);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      title="Upload Photos"
      subtitle="Must include handwritten seller name and date visible in photos"
      isRequired
    >
      <div className="space-y-4">
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
              Drag and drop your photos here
            </p>
            <p className="mb-4 text-sm text-gray-500">or click to browse files</p>

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-pink-600 hover:bg-pink-700"
            >
              Choose Files
            </Button>

            <p className="mt-4 text-xs text-gray-500">
              {acceptedFormats.join(', ')} up to {maxSize}MB each
            </p>

            <input
              ref={fileInputRef}
              required
              type="file"
              accept="image/*"
              multiple
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) handleFilesChange(e.target.files);
              }}
              className="hidden"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        {(existingImages.filter(img => !removedImages.includes(img)).length > 0 || files.length > 0) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.filter(img => !removedImages.includes(img)).map((img, index) => (
              <div key={`existing-${index}`} className="relative rounded-lg border p-2 bg-white">
                <img
                  src={img}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                  Existing
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveExisting?.(img)}
                  className="absolute top-1 left-1 p-1 bg-white rounded-full hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {files.map((file, index) => (
              <div key={`new-${index}`} className="relative rounded-lg border p-2 bg-white">
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="h-24 w-full object-cover rounded"
                  />
                ) : (
                  <div className="flex h-24 items-center justify-center bg-gray-100 rounded">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-sm text-amber-900">
            <span className="font-semibold">Important Note</span>
            <br />
            Listings without proof photos will be rejected. Make sure your handwritten seller name and today's date are clearly visible.
          </AlertDescription>
        </Alert>
      </div>
    </StepCard>
  );
}
