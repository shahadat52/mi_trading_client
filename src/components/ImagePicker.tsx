import React, { useRef } from "react";

type Props = {
    onFileSelect: (file: File) => void;
};

const ImagePicker: React.FC<Props> = ({ onFileSelect }) => {
    const galleryInputRef = useRef<HTMLInputElement | null>(null);
    const cameraInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }

        // reset value so same file can be selected again
        e.target.value = "";
    };

    return (
        <div className="flex gap-3">
            {/* Hidden Gallery Input */}
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Hidden Camera Input */}
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
            />
            {/* Camera Button */}
            <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                📷 Camera
            </button>

            {/* Gallery Button */}
            <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                🖼 Gallery
            </button>


        </div>
    );
};

export default ImagePicker;