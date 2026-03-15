import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import supabase from "../../../utils/database";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", reqBody.email)
      .single();

    if (!error) {
      if (reqBody.password === data.password) {
        const secertKey = new TextEncoder().encode(
          "next-market-route-handlers",
        );

        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1h")
          .sign(secertKey);

        console.log(token);

        return NextResponse.json({
          message: "ユーザーログイン成功",
          token: token,
        });
      } else {
        return NextResponse.json({
          message: `ユーザーログイン失敗 : パスワードが違います`,
        });
      }
    } else {
      return NextResponse.json({
        message: `ユーザーログイン失敗 : ユーザー登録をしてください`,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: `ユーザーログイン失敗 : ${err}`,
    });
  }
}
