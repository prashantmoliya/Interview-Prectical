import { imgKit } from "../ImageKit"


// Get-Image
export const GetImageKit = async () => {
    try {
        const res = await imgKit.listFiles({ path: '/products', limit: 10 });
        console.log("Get-Image-Kit++", res);

        if (res?.$ResponseMetadata?.statusCode === 200) {
            // const images = res?.files || [];
            return res;
        }
    } catch (err) { 
        console.error('Error-Get-Image-Kit--', err);
    }
}

// Post-Image
export const PostImageKit = async (image) => {
    try {
        const fileName = `${image.name}_${Date.now()}`;
        const imgParams = {
            file: image,
            fileName: fileName,
            folder: '/products/',
            tags: [],
        }

        const res = await imgKit.upload(imgParams);
        // console.log("Post-Image-Kit++", res);

        if (res?.$ResponseMetadata?.statusCode === 200) {
            return res;
        }
    } catch (err) {
        console.error('Error-Post-Image-Kit--', err);
    }
}


// Delete-Image
export const DeleteImageKit = async (imageId) => {
    try {
        const res = await imgKit.deleteFile(imageId);
        console.log("Delete-Image-Kit++", res);

        if (res?.$ResponseMetadata?.statusCode === 200) {
            return res;
        }
    } catch (err) {
        console.error('Error-Delete-Image-Kit--', err);
    }
}





// Image-Kit 
// More info below link read 

// https://chatgpt.com/share/67daa4d4-c490-8009-aff4-f5ac2049cbff