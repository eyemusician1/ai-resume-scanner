import {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
        // Don't use acceptedFiles from dropzone, manage state ourselves
    })

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Remove button clicked'); // Debug log
        setSelectedFile(null);
        onFileSelect?.(null);
    };

    // Debug: log when component re-renders
    useEffect(() => {
        console.log('FileUploader rendered with file:', selectedFile?.name || 'null');
    });

    return (
        <div className="w-full gradient-border">
            {selectedFile ? (
                // File selected - separate from dropzone to avoid conflicts
                <div className="space-y-4">
                    <div className="uploader-selected-file">
                        <img src="/images/pdf.png" alt="pdf" className="size-10 max-sm:size-8" />
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm max-sm:text-xs font-medium text-gray-700 truncate">
                                    {selectedFile.name}
                                </p>
                                <p className="text-sm max-sm:text-xs text-gray-500">
                                    {formatSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>
                        <button 
                            type="button"
                            className="p-2 cursor-pointer flex-shrink-0 hover:bg-red-100 rounded" 
                            onClick={handleRemoveFile}
                            onMouseDown={(e) => e.stopPropagation()}
                            style={{ zIndex: 10 }}
                        >
                            <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center">
                        <button 
                            type="button"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            {...getRootProps()}
                        >
                            Choose a different file
                        </button>
                        <input {...getInputProps()} />
                    </div>
                </div>
            ) : (
                // Upload area - only show when no file selected
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="space-y-4 cursor-pointer">
                        <div className="p-4 max-sm:p-2">
                            <div className="mx-auto w-16 h-16 max-sm:w-12 max-sm:h-12 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-20 max-sm:size-16" />
                            </div>
                            <p className="text-lg max-sm:text-base text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-lg max-sm:text-base text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileUploader