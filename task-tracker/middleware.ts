import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {},
    {
        callbacks: {
            authorized: ({token, req}) => {
                const path = req.nextUrl.pathname;

                if(path.startsWith('/admin')){
                    return token?.role === 'admin';
                }

                if (path.startsWith("/login") || path.startsWith("/signup") || path.startsWith("/api/auth")) {
                    return true;
                }

                return !!token;
            }
        }
    }
)

export const config = {
     matcher: ["/dashboard/:path*", "/tasks/:path*", "/admin/:path*"],
};