"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../utils/useAuth";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/items/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            price,
            image,
            description,
            email: loginUserEmail,
          }),
        },
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch (err) {
      console.error("アイテム作成失敗:", err);
      alert("アイテム作成失敗");
    }
  };

  if (loginUserEmail) {
    return (
      <div>
        <h1 className="page-title">Create Item</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="アイテム名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="価格"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="画像URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <textarea
            name="description"
            rows={15}
            placeholder="商品説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit">作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
