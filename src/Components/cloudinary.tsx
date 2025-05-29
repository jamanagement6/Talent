const Cloudinary = async (files: File[] | Blob | File) => {
    const presetKey = "ivpdncki";
    const cloudName = "dsdkmnf0b";
    const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  
    const uploadFile = async (file: File | Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", presetKey);
  
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      return result.secure_url;
    };
  
    try {
      if (Array.isArray(files)) {
        const uploadedFiles = await Promise.all(files.map((obj)=>uploadFile(obj)));
        return uploadedFiles;
      } else {
        return await uploadFile(files);
      }
    } catch (err: any) {
      console.error("Error uploading files to Cloudinary:", err);
      alert(err.message);
    }
  };
  
  export default Cloudinary;