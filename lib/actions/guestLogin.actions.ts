"use server";

import * as z from "zod";
import { GuestSchema } from "@/schemas";
import { getUserByName } from "@/lib/actions/user.actions";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const guestLogin = async (values: z.infer<typeof GuestSchema>) => {
    const validatedFields = GuestSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Ungültige Felder" };
    }

    const { name, refcode } = validatedFields.data;

    const existingUser = await getUserByName(name as string);

    if (!existingUser || !existingUser?.name || !existingUser?.refcode) {
        return { error: "Gast Konto existiert nicht!" };
    }

    // Verify refcode
    if (existingUser.refcode !== refcode) {
        return { error: "Ungültiger Refcode!" };
    }

    try {
        // Perform sign in with guest credentials (assuming you have logic for guest sign-in)
        await signIn("guest", {
            name: existingUser.name,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        
        return { success: "Gast-Login erfolgreich!" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Fehlerhafte Eingabe beim Gast-Login!" };
                default:
                    return { error: "Etwas ist schiefgelaufen!" };
            }
        }

        throw error;
    }
};