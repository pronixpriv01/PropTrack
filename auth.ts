import NextAuth from "next-auth";

import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from "@prisma/client";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";

import { getUserById } from "@/lib/actions/user.actions";
import { getTwoFactorConfirmationByUserId } from "@/lib/actions/twoFactorConfirmation.actions";
import { getAccountByUserId } from "./lib/actions/account.actions";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update,
} = NextAuth({
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async signIn({ user, account }) {
            // console.log("Sign-in callback triggered");
            // console.log("User:", user);
            // console.log("Account:", account);

            if (account?.provider !== "credentials") {
                // console.log("OAuth provider detected, bypassing email verification.");
                return true;
            }

            const existingUser = await getUserById(user.id as string);
            // console.log("Existing user:", existingUser);

            if (!existingUser?.emailVerified) {
                // console.log("Email not verified for user:", user.id);
                return false;
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                // console.log("Two-factor confirmation:", twoFactorConfirmation);

                if (!twoFactorConfirmation) {
                    // console.log("Two-factor confirmation not found for user:", existingUser.id);
                    return false;
                }

                // console.log("Deleting two-factor confirmation for user:", existingUser.id);
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        async jwt({ token }) {
            // console.log("JWT callback triggered");
            // console.log("Token before modification:", token);

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            // console.log("Existing user:", existingUser);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            // console.log("Token after modification:", token);

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
