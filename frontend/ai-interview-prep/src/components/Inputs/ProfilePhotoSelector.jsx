import React, { useState, useRef, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate preview when user selects new file
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      setPreview?.(newPreview);
      setPreviewUrl(newPreview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setPreview?.(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Pick correct image source:
  const imageSrc = preview || previewUrl || (typeof image === "string" ? image : null);

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!imageSrc ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full cursor-pointer relative">
          <LuUser className="text-4xl text-orange-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={imageSrc} 
            alt="Profile photo" 
            className="w-20 h-20 rounded-full object-cover" 
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full absolute -bottom-1 -right-1 text-white cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
