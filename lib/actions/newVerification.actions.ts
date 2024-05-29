"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { getVerificationTokenByToken } from "@/lib/actions/verificationToken.actions";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token existiert nicht!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token ist abgelaufen!" }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email existiert nicht!" };
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Email verifiziert!" };
}