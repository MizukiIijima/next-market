import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function proxy(request) {
  // Item read APIs are public.
  if (request.method === "GET" && request.nextUrl.pathname.startsWith("/api/items")) {
    return NextResponse.next();
  }
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({
      message: "認証失敗 : トークンがありません",
    });
  }

  try {
    const seacretKey = new TextEncoder().encode("next-market-route-handlers");
    const decodedJwt = await jwtVerify(token, seacretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "認証失敗 : トークンが無効です",
    });
  }
}

export const config = {
  matcher: ["/api/items/:path*"],
};
