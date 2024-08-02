// export { default } from "next-auth/middleware"

import { withAuth } from "next-auth/middleware";export default


withAuth({ pages: { signIn: "/auth/signin",},});
// export const config = { matcher: ["/dashboard"] }
