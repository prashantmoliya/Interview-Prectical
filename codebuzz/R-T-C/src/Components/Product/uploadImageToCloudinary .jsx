import axios from "axios";

export const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
    formData.append("cloud_name", "YOUR_CLOUD_NAME");

    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", formData);
        return response.data.secure_url;
    } catch (error) {
        console.error("Image Upload Error:", error);
        return null;
    }
};  