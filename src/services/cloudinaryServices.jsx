import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const baseURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const uploadImg = async (img, fileName) => {
  console.log(fileName);
  console.log(img);

  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", uploadPreset);
  data.append("public_id", fileName);

  try {
    const response = await axios.post(baseURL, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
