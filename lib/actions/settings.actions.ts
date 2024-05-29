"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById, getUserByEmail } from "@/lib/actions/user.actions";
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Keine Berechtigung!"}
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Keine Berechtigung!"}
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Diese Email wird bereits verwendet!"}
        }

        const verificationToken = await generateVerificationToken(values.email as string);

        await sendVerificationEmail (
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Authentifizierungs Email wurde versendet!"}
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(
            values.password,
            dbUser.password,
        );

        if (!passwordMatch) {
            return { error: "Passwort nicht korrekt!"}
        };

        const hashedPassword = await bcrypt.hash(
            values.newPassword,
            10,
        );
        values.password = hashedPassword;
        values.newPassword = undefined;
    }
    const updateData = {
            name: values.name,
            email: values.email,
            isTwoFactorEnabled: values.isTwoFactorEnabled,
            role: values.role,
    };

    await db.user.update({
        where: { id: dbUser.id },
        data: updateData,
    });


    return { success: "Einstellungen gesichert!"};
}
