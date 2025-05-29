import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";

interface SingleDropZoneProps {
  image: string | null;
  setImage: (image: string | null) => void;
  setImageFile: (image: File | null) => void;
}

const SingleDropZone: React.FC<SingleDropZoneProps> = ({
  image,
  setImage,
  setImageFile,
}) => {
  const dropzoneRef = useRef<HTMLElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0]; // Only handle the first file
    const newImage = URL.createObjectURL(acceptedFile);
    setImage(newImage);
    setImageFile(acceptedFile);
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
  };

  const handleClick = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.click();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false, // Only allow one file
    onDrop,
  });

  return (
    <section
      {...getRootProps()}
      ref={dropzoneRef}
      className="px-2 py-3 rounded-md cursor-pointer hover:border-blue-500 border-2"
    >
      <input {...getInputProps()} />
      {image ? (
        <div className="relative w-full h-full group mt-4">
          <img
            src={image}
            alt="Selected"
            className="object-contain h-full w-full"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 text-white text-xs p-1 rounded-full"
          >
            ❌
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <button onClick={handleClick}>
            <h2 className="text-gray-500">Add Image</h2>
          </button>
        </div>
      )}
    </section>
  );
};

export default SingleDropZone;
