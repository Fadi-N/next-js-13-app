import NextAuth, {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // Google authentication
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // Github authentication
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"},
            },
            async authorize(credentials) {
                // During authentication, if user forgets to enter email or password, an error is thrown
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }

                // Find user by credential email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // Check if the user exists or if the user does not have hashed password, an error is thrown
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                // Check and compare if the password that user entered is correct
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)