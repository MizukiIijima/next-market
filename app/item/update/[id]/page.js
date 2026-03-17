"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useAuth from "../../../utils/useAuth";

const UpdateItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginUserEmail = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const getSingleItem = async () => {
      // const params = await context.params;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/items/${id}`,
      );
      const jsonData = await response.json();
      setTitle(jsonData.singleItem.name);
      setPrice(jsonData.singleItem.price);
      setImage(jsonData.singleItem.image);
      setDescription(jsonData.singleItem.description);
      setEmail(jsonData.singleItem.email);
      setLoading(true);
    };
    getSingleItem();
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const params = await context.params;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/items/${id}`,
        {
          method: "PUT",
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
      console.error("アイテム編集失敗:", err);
      alert("アイテム編集失敗");
    }
  };

  if (loading) {
    if (email === loginUserEmail) {
      return <div>...</div>;
    } else {
      return <div>権限がありません。</div>;
    }
  } else {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="page-title">アイテム編集</h1>
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
        <button type="submit">編集</button>
      </form>
    </div>
  );
};

export default UpdateItem;
