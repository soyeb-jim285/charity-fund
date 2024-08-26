import { ImageUpIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const ImageUpload = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-72 aspect-square rounded-lg bg-[#eff1f5] border-2 border-dotted border-[#8c8fa1] cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="w-full h-3/4 flex items-center justify-center">
        <ImageUpIcon className="size-2/6 stroke-1 mr-3" />
      </div>
      <div className="w-full  flex items-center justify-center">
        {isDragActive ? (
          <div className="flex justify-center items-center px-5">
            <p>Drop the files here ...</p>
          </div>
        ) : (
          <div className="flex items-center justify-center px-5">
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        )}
      </div>
    </div>
  );
};
