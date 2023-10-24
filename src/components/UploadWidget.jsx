import { useEffect, useRef } from "react";

const UploadWidget = ({ tag, onImageUpload }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          const secureUrl = result.info.secure_url;
          console.log(secureUrl);
          if (onImageUpload) {
            onImageUpload(secureUrl);
          }
        }
      }
    );
  }, []);
  return (
    <>
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white bg-indigo-300 border border-gray-200 rounded-lg hover:bg-indigo-400 focus:ring-4 focus:ring-primary-300"
        onClick={() => widgetRef.current.open()}
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg>
        {tag}
      </button>
    </>
  );
};

export default UploadWidget;
