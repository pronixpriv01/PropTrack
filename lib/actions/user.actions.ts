import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserByName = async (name: string) => {
    try {
        const user = await db.user.findFirst({ where: { name } });

        return user;
    } catch (error) {
        return null;
    }
}

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
    const hashedPassword = RegisterSchema.safeParse(values);
    const validatedFields = RegisterSchema.safeParse(values);
}