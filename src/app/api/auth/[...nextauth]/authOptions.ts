import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/db"
import {create, myFirst} from "@/repositories/team";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            maxAge: 300,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    adapter: PrismaAdapter(prisma),
    events: {
        async createUser(message) {
            const user = message.user;
            await create(user.id, {name: `Personal team`})
        },
    },
    callbacks: {
        async session({session, user, token}) {
            if (session && token) {
                try {
                    const team = await myFirst(token.sub!)
                    session.user.team = team
                } catch (e) {}
            }
            return session
        },
    },
    debug: process.env.NODE_ENV === 'development',
}