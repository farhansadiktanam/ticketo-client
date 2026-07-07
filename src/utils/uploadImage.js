import toast from "react-hot-toast";

export const imageUpload = async (imageFile) => {
  const imageData = new FormData();
  imageData.append("image", imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
    {
      method: "POST",
      body: imageData,
    },
  );

  const imagedata = await res.json();
  console.log(imagedata, "IMAGE UPLOAD");
  if (imagedata.success) {
    toast.success("Image upload successfully..!!");
    return imagedata.data.url;
  } else {
    toast.error("Image upload failed");
  }
};
