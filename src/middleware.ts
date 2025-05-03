import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Optional: bảo mật cookie bằng secret riêng
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  // Nếu đã login và truy cập trang /auth => redirect về home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Nếu chưa login và truy cập trang được bảo vệ
  if (!token && !isAuthPage && req.nextUrl.pathname.startsWith("/movies")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/movies/:path*", "/auth/:path*"],
};
