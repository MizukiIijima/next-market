import { useState } from "react";

const ImgInput = (props) => {
  const [imageFile, setImageFile] = useState("");
  const handleClick = async () => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "next-market");
      data.append("cloud_name", "dmawh7gwk");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmawh7gwk/image/upload",
        {
          method: "POST",
          body: data,
        },
      );
      const jsonData = await response.json();
      const uploadedUrl = jsonData.secure_url ?? jsonData.url ?? "";
      await props.setImage(uploadedUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Error uploading image");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="img-input">
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button
        onClick={handleClick}
        disabled={!imageFile}
      >
        画像をアップロード
      </button>
    </div>
  );
};

export default ImgInput;
