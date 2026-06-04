import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxWidthOrHeight: 512,
    maxSizeMB: 0.8,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};