import { NextResponse } from "next/server";
import supabase from "../../../utils/database";

export async function GET(request, context) {
  const params = await context.params;
  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", params.id)
      .single();
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "アイテム読み取り成功（単一）",
      singleItem: data,
    });
  } catch (err) {
    return NextResponse.json({
      message: `アイテム読み取り失敗（単一） : ${err}`,
    });
  }
}

export async function PUT(request, context) {
  const reqBody = await request.json();
  const params = await context.params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", params.id)
      .single();

    if (error) throw new Error(error.message);

    if (data.email === reqBody.email) {
      const { error: updateError } = await supabase
        .from("items")
        .update(reqBody)
        .eq("id", params.id);

      if (updateError) throw new Error(updateError.message);

      return NextResponse.json({
        message: "アイテム更新成功",
      });
    } else {
      return NextResponse.json({
        message: "アイテム更新失敗 : 別のユーザーが作ったアイテムです",
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: `アイテム更新失敗 : ${err}`,
    });
  }
}

export async function DELETE(request, context) {
  const reqBody = await request.json();
  const params = await context.params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", params.id)
      .single();

    if (error) throw new Error(error.message);

    if (data.email !== reqBody.email) {
      const { error: deleteError } = await supabase
        .from("items")
        .delete()
        .eq("id", params.id);

      if (deleteError) throw new Error(deleteError.message);
      return NextResponse.json({
        message: "アイテム削除成功",
      });
    } else {
      return NextResponse.json({
        message: "アイテム削除失敗 : 別のユーザーが作ったアイテムです",
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: `アイテム削除失敗 : ${err}`,
    });
  }
}
