import { useState } from "react";

interface ImagePreviewButtonProps {
    imageUrl: string;
    buttonText?: string;
}

const ImagePreviewButton = ({
    imageUrl,
    buttonText = "Preview",
}: ImagePreviewButtonProps) => {
    const [showImage, setShowImage] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowImage(true)}
                className="px-2 py-1 bg-green-600 text-white rounded"
            >
                {buttonText}
            </button>

            {showImage && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setShowImage(false)}
                >
                    <div
                        className="bg-white p-3 rounded"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={imageUrl}
                            alt="preview"
                            className="max-w-full max-h-full"
                        />

                        <button
                            onClick={() => setShowImage(false)}
                            className="mt-3 w-full px-3 py-2 bg-red-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagePreviewButton;