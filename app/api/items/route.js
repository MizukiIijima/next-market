import { NextResponse } from "next/server";
import supabase from "../../utils/database";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase.from("items").select();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      message: "アイテム読み取り成功（全件）",
      allItems: data,
    });
  } catch (err) {
    return NextResponse.json({
      message: `アイテム読み取り失敗（全件） : ${err}`,
    });
  }
}

export async function POST(request) {
  const reqBody = await request.json();

  try {
    await supabase.from("items").insert(reqBody);
    return NextResponse.json({ message: "アイテム作成" });
  } catch (err) {
    return NextResponse.json({ message: `アイテム作成失敗 : ${err}` });
  }
}
