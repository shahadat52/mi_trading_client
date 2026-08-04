import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxWidthOrHeight: 512,
    maxSizeMB: 0.1,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};