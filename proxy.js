import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc3MzQxMTgwOX0.0y-oo6i4DnZKmZRYyX0IROc-KfZmxarMs9CX4zMquNU";

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
  matcher: [
    "/api/items",
    "/api/items/:path*",
  ],
};
