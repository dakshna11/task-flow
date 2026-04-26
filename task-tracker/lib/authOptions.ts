import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
import Task from "@/models/Task";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                await connectToDatabase();
                const user = await Task.findOne({ email: credentials?.email });
                if(!user) {
                    throw new Error("No user found with the email");
                }

                const isValid = await bcrypt.compare(credentials!.password, user.password);
                if(!isValid) {
                    throw new Error("Invalid password");
                }
                
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role || "user",
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user){
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role as string;
            }

            return session;
        }
    },
    pages:{
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
}
