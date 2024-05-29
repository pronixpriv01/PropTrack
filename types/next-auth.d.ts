import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { ExtendedUser } from '../next-auth';

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
};

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: UserRole
    }
}