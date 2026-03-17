"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "../../../utils/useAuth";

const DeleteItem = (context) => {
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
      const params = await context.params;
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
    const params = await context.params;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: loginUserEmail,
          }),
        },
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch (err) {
      console.error("アイテム削除失敗:", err);
      alert("アイテム削除失敗");
    }
  };

  if (loading && email !== loginUserEmail) {
    return <div>権限がありません。</div>;
  }

  if (loading) {
    return (
      <div>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <Image
            src={image}
            width={750}
            height={500}
            alt={"item-image"}
            priority
          />
          <h3>￥{price}</h3>
          <button type="submit">削除</button>
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default DeleteItem;
