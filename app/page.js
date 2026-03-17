import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const getAllItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/items`);
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  console.log(jsonData);
  return allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItems();

  return (
    <div className="grid-container-in">
      {allItems.map((item) => (
        <Link
          href={`/item/readsingle/${item.id}`}
          key={item.id}
        >
          <Image
            src={(item.image ?? "").trimStart()}
            width={750}
            height={500}
            alt="item image"
            priority
          />
          <p>{item.title}</p>
          <p>￥{item.price}</p>
          <p>Description: {item.description.substring(0, 80)}...</p>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
